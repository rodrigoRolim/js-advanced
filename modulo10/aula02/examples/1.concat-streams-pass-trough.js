import { Writable, PassThrough } from 'stream'

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

const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, "")
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  }
})


function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    current.pipe(prev, { end: false })

    current.on('end', () => items.every(s => s.ended) && prev.end())
    return prev
  }, new PassThrough())
}

merge(results).pipe(output)
// results[0].pipe(output)
// results[1].pipe(output)
