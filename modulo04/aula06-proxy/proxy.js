'use strict';

const Event = require('events');
const event = new Event();
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

/* event.emit(eventName, 'oi')
event.emit(eventName, 'tchau') */
const myCounter = {
  counter: 0
}
const proxy = new Proxy(myCounter, {
  // trap
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey]})
    target[propertyKey] = newValue
    return true // retorna true para continuar o ciclo de vida do node
  },
  get: (object, prop) => {
    console.log('chamou!', { object, prop })
    return object[prop]
  }
})
// jaja e para sempre!
setInterval(function (){
  proxy.counter += 1
  console.log('[3]: setInterval')
  if (proxy.counter === 10) clearInterval(this)
}, 200);

// futuro futuro futuro!
setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: setTimeout')
}, 100)

// se quer que executa agora, agorarinha
setImmediate(() => {
  console.log("[1]: ", 'setImmediate', proxy.counter)
})
// executa agora, agorinha, mas acaba com o ciclo de vida do node (prioridade máxima)
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: nextTick')
})