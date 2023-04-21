const { assert } = require("console");

const myMap = new Map();

// podem ter qualquer coisa como cheve

myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'hell')

// usando um constructor

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

console.log('myMap', myMap)

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), "hell")

// Em Objects a Chave só pode ser String ou Symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' })

assert.deepStrictEqual(myMap.get({ id: 1}), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' })

// utilitarios
// - No Object seria Object.keys({a:1}).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerçao implicita para boolean e retorna false
// o jeito certo em Object é ({ name: 'ErickWendel' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// param remover um item do objeto
// delete item.id
// imperformatico para o javascript

assert.ok(myMap.delete(onlyReferenceWorks))

// não dá para iterar em Objects diretamente
// tem que transforma com o Object.entries(item)

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, 'one'],["Erick", {"text":"two"}],[true, () => {}]]))

for (const [key, value] of myMap) {
  console.log(key, value)
}

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// {{ }}.toString() === '[Object Object]'
// {{toString: () => 'Hey'}}.toString() === 'Hey'

// qualquer chave pode colidir com as propriedades herdadas do objecto, como
// constructor, toString(), valueOf e etc

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor)

assert.deepStrictEqual(myMap.has(actor), true)
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não da para limpar um Obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// ----WeakMap ----

// pode ser coletado após perder as referências
// usado em casos beeem específicos

// tem a maioria dos benefícios do Map
// Mas: não é iteravel
// só chaves de referencia e que você já conheça
// mais leves e preve leak de memoria, pq depois que as instancias saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)
