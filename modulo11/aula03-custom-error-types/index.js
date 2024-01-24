import { createServer } from 'http'
import BusinessError from './errors/businessErros.js'

function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError('age must be higher than 20!')
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('name must be at least 4 characters')
  }

  // simulando um outro error, por exemplo, de banco de dados

  if (Reflect.has(hero, "connectionError")) {
    throw new Error("error connecting to DB!")
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      validateHero(hero)
      console.log(hero)
      response.writeHead(200)
      response.end()
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(400)
        response.end(error.message)
        continue;
      }
      response.writeHead(500)
      response.end()
    }
  }
}

createServer(handler).listen(3000, () => console.log('running at 3000'))

/**
 * curl -i localhost:3000 -X POST --data '{ "name": "vinagador", "age": 80 }'
 */