/* process.stdin.pipe(process.stdout)
  .on('data', msg => console.log('data', msg.toString()))
  .on('error', err => console.log('error', err.toString))
  .on('end', () => console.log('end'))
  .on('close', _ => console.log('close')); */

import { createReadStream, readFileSync } from 'fs';
// ls | grep package.json | xargs cat | jq .name

// teminal 1: servidor
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// teminal 2: cliente
// node -e "process.stdin.pipe(require('net').connect(1338))"

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http';
http.createServer((req, res) => {
  // má prática
  /*  const file = readFileSync('big.file')
  res.write(file)
  res.end() */

  createReadStream('big.file')
    .pipe(res)
}).listen(3000, () => console.log("running at 3000"));

// curl localhost:3000 -o output.txt
