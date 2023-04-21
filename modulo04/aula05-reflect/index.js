'use strict';

const user = {
  name: 'rodrigo'
}

Reflect.defineProperty(user, 'age', { value: 12 })

console.log(user.age)