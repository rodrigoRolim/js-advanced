

const item = {
  name: 'ErickWendel',
  age: 25,
  // string: 1 se não for primitivo, vai chamar o valueOf
  toString() {
    return `Name ${this.name}, Age: ${this.age}`
  },
  // number: 1 se não for primitivo, chama o toString
  valueOf() {
    return 007
  },
  // ele tem prioridade na parada
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType)
    const types = {
      string:  JSON.stringify(this),
      number: '0007'
    }

    return types[coercionType] || types.string
  }
}

console.log('item', "".concat(item))

console.log('String', String(item))
console.log("Number", Number(item))