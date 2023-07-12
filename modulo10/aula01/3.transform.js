import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs' // criar um buffer de dados sob demanda

// font de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 10; index++) {
      const person = { id: Date.now() + index, name: `rodrigo-${index}`}
      const data = JSON.stringify(person)
      this.push(data)
    }

    // os dados acabaram
    this.push(null)
  }
})

// processamento dos dados
const mapFields = Transform({
  transform(chunk, enconding, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`
    cb(null, result)
  }
})
const mapHeaders = Transform({
  transform(chunk, enconding, cb) {
    this.counter = this.counter ?? 0
    if (this.counter) {
      return cb(null, chunk) // continua o fluxo
    }

    this.counter += 1
    cb(null, "id,name\n".concat(chunk))
  }
})
// saída de dados
const writable = Writable({
  write(chunk, enconding, cb) {
    console.log('msg', chunk.toString())
    cb()
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // writable é sempre a saída => imprimir, salvar, ignorar
  //.pipe(writable) // ou pipe(process.stdout)
  .pipe(createWriteStream('my.csv'))


pipeline
  .on('end', () => console.log('Finished'))