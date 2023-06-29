import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals'
import Util from '../../src/util'


describe('#Util - Strings', () => {

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('#upperCaseFirtsLetter should transform the first letter in uppercase', () => {
    const data = 'hello'
    const expected = 'Hello'
    const result = Util.upperCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })
  test('#lowerCaseFirtsLetter should transform the first letter in lowercase', () => {
    const data = 'Hello'
    const expected = 'hello'
    const result = Util.lowerCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })
  test('#lowerCaseFirtsLetter fiven an empty string it should return empty', () => {
    const data = ''
    const expected = ''
    const result = Util.lowerCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })
  test('#upperCaseFirtsLetter fiven an empty string it should return empty', () => {
    const data = ''
    const expected = ''
    const result = Util.upperCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })
})