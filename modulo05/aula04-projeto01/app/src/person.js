const { evaluateRegex } = require("./utils")

class Person {
  // \(w+):\s.*
  // $1,

  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // (\w+)
    // this.$1 = $1
    const firstLetter = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetter, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }
    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade)
    this.estadoCivil = formatFirstLetter(estadoCivil)
    this.documento = documento.replace(evaluateRegex(/\D/g), "")
    this.rua = rua.match(evaluateRegex(/(?<=\sa\a).*$/)).join()
    this.numero = numero
    this.bairro = bairro.match(evaluateRegex(/(?<=\s)\.*$/)).join()
    this.estado = estado.replace(evaluateRegex(/\.$/), "")
  }
}

module.exports = Person;