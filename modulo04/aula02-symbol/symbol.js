const assert = require('assert');

// --- keys

const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal objects'
user[uniqueKey] = 'value for Symbol'

console.log('getting normal Objects', user.userName)
// sempre único em nível de endereço de memória
console.log('getting nomal Objects', user[Symbol("userName")])
console.log('getting nomal Objects', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal objects')

// sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], undefined)
// é dificil de pegar, mas não é secreto
console.log('symols', Object.getOwnPropertySymbols(user)[0])

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// well known Symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

for(const item of obj) {
  console.log(item)
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol("kItems")
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }
  [Symbol.ttoPrimitive](coercionType) {
    if(coercionType !== "string") throw new TypeError()

    const items = this[kItems]
      .map(item => new Intl.DateTimeFormat("pat-BR", { month: "long", day: "2-digit", year: "numeric" }))

    return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction"}).format(items)
  }
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }
  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for(const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
)

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02)
]

console.log('myDate', myDate)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), null)
assert.throws(() => myDate + 1, TypeError)

assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
  const dates = await Promise.all([...myDate])
  assert.deepStrictEqual(dates, expectedDates)
})()