import ContextStrategy from "./src/base/contextStrategy.js"
import PostegresStrategy from "./src/strategies/postegresStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"

const postegresConnectionString = "postgres://rodrigo:senha001@localhost:5432/heroes";
const postegresContext = new ContextStrategy(new PostegresStrategy(postegresConnectionString))
await postegresContext.connect()

const mongoDBConnectionString = "mongodb://rodrigo:senhaadmin@127.0.0.1:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await mongoDBContext.connect()

const data = [{
  name: 'rodrigo rolim',
  type: 'transaction'
}, {
  name: 'mariazinha',
  type: 'activityLog'
}]
const contextTypes = {
  transaction: postegresContext,
  activityLog: mongoDBContext
}

for(const {type, name} of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}

