import { pipeline } from 'stream/promises'
import { Writable } from 'stream'

import axios from 'axios'
const API_1 = 'http://localhost:3000'
const API_2 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method: 'GET',
    url: API_1,
    responseType: 'stream'
  }),
  axios({
    method: 'GET',
    url: API_2,
    responseType: 'stream'
  })
])

const results = requests.map(({ data }) => data)

/* const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, "")
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  }
})
 */

/* function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    current.pipe(prev, { end: false })

    current.on('end', () => items.every(s => s.ended) && prev.end())
    return prev
  }, new PassThrough())
} */
async function output(streams) {
  for await (const data of streams) {
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
  }
}
// passtrough strean
async function merge(streams) {
  for (const readable of streams) {
    // faz trabalhar com o objectMode 
    readable.setEncondig('utf-8')
    for await (const chunk of readable) {
      for ( const line of chunk.trim().split(/\n/)) {
        yield line
      }
    }
  }
}

pipeline(
  merge(results),
  output
)

// merge(results).pipe(output)
// results[0].pipe(output)
// results[1].pipe(output)
