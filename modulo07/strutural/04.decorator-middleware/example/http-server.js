import http from 'http'
import { InjectHttpInterceptor } from "./../index.js"

InjectHttpInterceptor()
function handlerRequest(request, response) {
  // curl -i localhost:3000
  // response.setHeader('X-Instrument-By', 'rodrigo')
  response.end('hello world')
}

const server = http.createServer(handlerRequest)
const port = 3000
server.listen(port, () => console.log('server running at', server.address().port))
