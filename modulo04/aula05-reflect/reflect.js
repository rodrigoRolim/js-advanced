'use strict';

const assert = require('assert')

// garantir semantica e segurança em objetos


// ---- apply

const database = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}
// executando antes
// myObj.add.apply = function () { throw new TypeError('Vixxe') }
// Function.prototype.apply = () => { throw new TypeError('Eicha rodei scripts maliciosos em seu código!') }

// quebra esse cara
assert.deepStrictEqual(database.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontencer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eicha rodei scripts maliciosos em seu código!') }

// esse aqui pode acontecer!!
database.add.apply = function () { throw new TypeError('Vixxe') }

assert.throws(
  () => database.add.apply({}, []),
  {
    name: "TypeError",
    message: "Vixxe"
  }
)

// Usando Reflect: 
const result = Reflect.apply(database.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)

// ---- apply


// ---- defineProperty

// questoes semanticas
function MyDate() {}

// feio pra caralho, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, "withObject", { value: () => 'Hey There, diabo!' })

// agora faz mais sentido
Reflect.defineProperty(MyDate, "withReflection", { value: () => 'hey dude, diabo!'})

assert.deepStrictEqual(MyDate.withObject, 'Hey There, diabo!')
assert.deepStrictEqual(MyDate.withReflection, 'hey dude, diabo!')

// ---- defineProperty


// ---- deleteProperty
const withDelete = { user: 'rodrigo' }
// imperformático, evitar ao máximo 
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'rodrigo' }
Reflect.deleteProperty(withReflection, "user")
assert.deepStrictEqual(withReflection.hasOunwProperty("user"), false)

// ---- deleteProperty

// ---- get

// Deveriamos fazer um get somente em instancia de referencia
assert.deepStrictEqual(1["userName"], undefined)
// com reflection, uma execeção será lançada!
assert.throws(() => Reflect.get(1, "userName"), TypeError)
// ---- get

// ---- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: ''}, "batman"))
// ---- has

// ownKeys
const user = Symbol("user")
const databaseUsers = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: 'rodrigo'
}

// Com os metodos de object, tempos que fazer 2 requisições
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUsers),
  ...Object.getOwnPropertySymbols(databaseUsers)
]

console.log('objectKeys', objectKeys)
assert.deepStrictEqual(objectKeys, ['id', Symbol.for("password"), user])

// com Reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUsers), ['id', Symbol.for("password"), user])
