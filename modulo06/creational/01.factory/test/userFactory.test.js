const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')


// <poderia ser em outro arquivo>
const dbData = [{ name: "Mariazinha" }, { name: "joazin" }]
class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}
// </poderia ser em outro arquivo>


rewiremock(() => require('./../src/util/database')).with(MockDatabase)

;(async () => {
  {
    const expected = [{ name: "MARIAZINHA" }, { name: "JOAZIN" }]
    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
    rewiremock.disable()
  }
  {
    const expected = [{ name: "RODRIGO ROLIM VERAS" }]
    const UserFactory = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
  }
})()