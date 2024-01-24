import { createServer } from "http";
import { MongoClient } from "mongodb";
import { promisify } from "util";

async function dbConnect() {
  const client = new MongoClient("mongodb://localhost:27017")
  await client.connect();
  console.log("Connected to mongodb://localhost:27017")
  const db = client.db('comics')
  return {
    collections: { heroes: db.collection('heroes') },
    client
  }

}
const { collections, client } = await dbConnect()

async function handler() {
  for await(const data of request) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({ ...hero, updatedAt: new Date().toUTCString() })
      const heroes = await collections.heroes.find().toArray()
      console.log({ heroes })
      response.writeHead(200)
      response.write(JSON.stringify(heroes))
    } catch (error) {
      console.log('a request error occurred', error)
      response.writeHead(500)
      response.write(JSON.stringify({ message: 'internal server error' }))

    } finally {
      response.end()
    }
  }
}


// await client.close()
/**
 * curl -i localhost:3000 -X POST --data '{"name": "batman", "age": "80"}'
 */
const server = createServer(handler).listen(3000, () => console.log('running at 3000 and process', process.pid))

const onStop = async (signal) => {
  console.log(`\n${signal} signal received`)

  console.log('Closing http server')
  await promisify(server.close.bind(server))()
  console.log('The http server has closed')

  // close(true) força o encerramento
  await client.close()
  console.log('Mongo connection has closed')
  process.exit(0)
}
// manipular o ctrl + c
// SIGTERM => kill
["SIGINT", "SIGTERM"].forEach(event => {
  process.on(event, onStop)
});

