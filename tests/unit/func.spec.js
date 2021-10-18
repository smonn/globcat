import { assert } from 'chai'
import {
  defaults,
  once,
  flatten,
  unique,
  typeOf
} from '../../src/func/index.js'

describe('func', function () {
  describe('defaults', function () {
    it('should make a shallow copy', function () {
      const result = defaults({ foo: 'baz' }, { foo: 'bar' })
      assert.equal(result.foo, 'bar', 'should use value from last object')
    })

    it('should make a deep copy', function () {
      const result = defaults({ foo: { bar: 1, baz: 2 } }, { foo: { bar: 3 } })
      const expectedBar = 3
      const expectedBaz = 2
      assert.equal(result.foo.bar, expectedBar, 'value should be overridden')
      assert.equal(result.foo.baz, expectedBaz, 'value should be kept')
    })
  })

  describe('once', function () {
    it('should call function only once', function () {
      let value = 1
      const expectedValue = 2
      const inc = once(() => {
        value += 1
      })
      inc()
      inc()
      assert.equal(value, expectedValue, 'should only be incremented once')
    })
  })

  describe('flatten', function () {
    it('should flatten nested arrays', function () {
      const numbers = { one: 1, two: 2, three: 3 }
      const array = [numbers.one, [numbers.two, [numbers.three]]]
      const expected = [numbers.one, numbers.two, numbers.three]
      assert.deepEqual(
        flatten(array),
        expected,
        'should have the same array values'
      )
    })

    it('should yield array even when argument is not', function () {
      const value = 1
      const expected = [value]
      assert.deepEqual(
        flatten(value),
        expected,
        'should have the same array values'
      )
    })
  })

  describe('unique', function () {
    it('should filter out duplicate values', function () {
      const list = ['foo', 'bar', 'baz', 'foo']
      const expected = ['foo', 'bar', 'baz']
      assert.deepEqual(
        unique(list),
        expected,
        'should only contain once of each value'
      )
    })
  })

  describe('typeOf', function () {
    it('should print correct type', function () {
      const id = function (x) {
        return x
      }

      assert.equal(typeOf(''), 'string', 'string should be string')
      assert.equal(typeOf({}), 'object', 'object should be object')
      assert.equal(typeOf([]), 'array', 'array should be array')
      assert.equal(typeOf(NaN), 'number', 'number should be number')
      assert.equal(
        typeOf(/abc/),
        'regexp',
        'regular expression should be regexp'
      )
      assert.equal(typeOf(true), 'boolean', 'boolean should be boolean')
      assert.equal(typeOf(Math), 'math', 'math object should be math')
      assert.equal(typeOf(new Date()), 'date', 'date instance should be date')
      assert.equal(typeOf(id), 'function', 'function should be function')
    })
  })
})
