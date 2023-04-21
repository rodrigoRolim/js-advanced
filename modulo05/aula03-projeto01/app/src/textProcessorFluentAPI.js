// o objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. MUITO similar ao padrão Builder
// a diferença aqui é sobre processos, o Builder sobre construção de objetos

const { evaluateRegex } = require("./utils")

class TextProcessorFluentAPI {
  // a propriedade privada
  #content
  constructor(content) {
    this.#content = content
  }
  extractPeopleData() {
    // ?<= fala que vai extrair os dados virão depois desse grupo
    // [contrante|contratada] ou um ou outro,
    // :\s{1} vai procurar o caracter literal de dois pontos seguidos por em espaço
    // tudo fica dentro de um parenteses para falar vamos pergar dai para frente

    // (?!s) negative look around, vai ignorar os contratantes do fim do documento (que tem so espaços a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

    // $ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> 
    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s)(?!\s)(.*\n.*?)$/gmi)
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson
    return this
  }
  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(item => item.split(splitRegex))
    return this
  }
  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
    return this
  }
  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI