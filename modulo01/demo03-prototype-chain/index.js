const obj = {}
const arr = []
const fn = () => {}

const assert = require('assert')

// internamente objetos literais viram funções explicitas

console.log('new Object() is {}', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referencia do objeto que possui as propriedades nele
console.log("obj.__proto__ === Object.prototype", obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, new Object().__proto__)

console.log("arr.__proto__ === Array.prototype", arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.__proto__)

console.log("fn.__proto__ === Function.prototype", fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.__proto__)

// o __proto__ de Object.proptotype é null

console.log("obj.__proto.__proto__ === null", obj.__proto.__proto__ === null)
assert.deepStrictEqual(obj.__proto__, null)

console.log("--------")

function Employee() {}
Employee.prototype.salary = () => "salary**"

function Supervisor() {}
// herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShre**"

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"

// podemos chamar via prototype. mas se tentar chamar diretamente dá erro

console.log(Manager.proptotype.salary())
console.log(Manager.salary()) // erro

// se não chamar o 'new', o primeiro __proto__ vai ser sempre
// a instancia de Function, sem herdar nossas classes
// Para acessar as classes sem o new, pode acessar direto via prototype

console.log("Manager.proptotype.__proto__ === Supervisor.prototype", Manager.proptotype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.proptotype.__proto__, Supervisor.prototype)

console.log("----------")

// quando chamamos com o 'new' o __proto__ recebe o prototype
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

console.log("-----")

const manager = new Manager()
console.log(' manager.salary()', manager.salary())
console.log(' manager.profitShare()', manager.profitShare())
console.log(' manager.monthlyBonuses()', manager.monthlyBonuses())

console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__) // null

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto.__proto, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto.__proto.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto.__proto.__proto__.__proto__, null)

console.log("---------")

class T1 {
  ping() { return "ping" }
}

class T2 extends T1 {
  pong() { return "pong" }
}

class T3 extends T2 {
  shoot() { return "shoot" }
}

const t3 = new T3();

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log('t3.ping()', t3.ping())
console.log('t3.pong()', t3.pong())
console.log('t3.shoot()', t3.shoot())

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)