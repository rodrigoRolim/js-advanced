import { createServer } from 'http'
import HeroEntity from './heroEntity.js'
import { statusCodes } from './util/httpStatusCodes.js'

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
      const parsedData = JSON.parse(data)
      if (Reflect.has(hero, "connectionError")) {
        throw new Error("error connecting to DB!")
      }

      const hero = new HeroEntity(parsedData)
      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.end(hero.notifications.join('\n'))
        continue;
      }

      console.log(hero)
      response.writeHead(statusCodes.OK)
      response.end()
    } catch (error) {

      response.writeHead(500)
      response.end()
    }
  }
}

createServer(handler).listen(3000, () => console.log('running at 3000'))

/**
 * curl -i localhost:3000 -X POST --data '{ "name": "vinagador", "age": 80 }'
 */