const { describe, it } = require("mocha")
const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require("../src/utils")


describe("Utils", () => {
  it("#evaluateRegex should thrown an error using an unsafe regex", () => {
    const unsafeRegex = /^([a-zA-Z0-9]+\s?)+$/

    /* 
      time \
      node --eval "/^([a-zA-Z0-9]+\s?)+$/.test('eaaae mano como vai voce e como vai eaaae mano como vai voce e como vai?eaaae mano como vai voce e como vai??') && console.log('legalzin')"
    */
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })
  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /^([a-z])$/
    expect(() => evaluateRegex(safeRegex)).not.to.throw()
    expect(() => evaluateRegex(safeRegex)).to.be.ok
  })
})