import { Readable, Writable } from 'stream'

// font de dados
const readable = Readable({
  read() {
    this.push('Hello world 1')
    this.push('Hello world 2')
    this.push('Hello world 3')
    this.push('Hello world 4')

    // os dados acabaram
    this.push(null)
  }
})

// saída de dados

const writable = Writable({
  write(chunk, enconding, cb) {
    console.log('msg', chunk.toString())
    cb()
  }
})

readable
  // writable é sempre a saída => imprimir, salvar, ignorar
  .pipe(writable) // ou pipe(process.stdout)