import http from 'http'
import { Readable } from 'stream'

function api1(request, response) {
 /*  response.write('test01\n')
  response.write('test02\n')
  response.write('test03\n')
  
  request.pipe(response) */

  let count = 0;
  let maxItems = 99;
  const readable = Readable({

    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `rodrigo-${count}`}) + '\n')
          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }
  
      setInterval(function() { everySecond(this) })
    },
  })

  readable.pipe(response)
}

function api2(request, response) {
  let count = 0;
  let maxItems = 99;
  const readable = Readable({

    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `zezao-${count}`}) + '\n')
          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }
  
      setInterval(function() { everySecond(this) })
    },
  })

  readable.pipe(response)
}

http.createServer(api1).listen(3000, () => console.log('listening on port 3000'))
http.createServer(api1).listen(4000, () => console.log('listening on port 4000'))
