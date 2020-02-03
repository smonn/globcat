'use strict'

const test = require('tape')
const func = require('../func')

test('func#defaults makes a shallow copy', (assert) => {
  const result = func.defaults({ foo: 'baz' }, { foo: 'bar' })
  assert.equal(result.foo, 'bar')
  assert.end()
})

test('func#defauts makes a deep copy', (assert) => {
  const result = func.defaults({ foo: { bar: 1, baz: 2 } }, { foo: { bar: 3 } })
  const expectedBar = 3
  const expectedBaz = 2
  assert.equal(result.foo.bar, expectedBar, 'value should be overridden')
  assert.equal(result.foo.baz, expectedBaz, 'value should be kept')
  assert.end()
})

test('func#once calls function only once', (assert) => {
  let value = 1
  const expectedValue = 2
  const inc = func.once(() => {
    value += 1
  })
  inc()
  inc()
  assert.equal(value, expectedValue)
  assert.end()
})

test('func#flatten flattens nested arrays', (assert) => {
  const numbers = { one: 1, two: 2, three: 3 }
  const array = [ numbers.one, [ numbers.two, [ numbers.three ] ] ]
  const expected = [ numbers.one, numbers.two, numbers.three ]
  assert.deepEqual(func.flatten(array), expected)
  assert.end()
})

test('func#unique filters out duplicate values', (assert) => {
  const list = [ 'foo', 'bar', 'baz', 'foo' ]
  const expected = [ 'foo', 'bar', 'baz' ]
  assert.deepEqual(func.unique(list), expected)
  assert.end()
})

test('func#typeOf prints correct type', (assert) => {
  const id = function (x) {
    return x
  }

  assert.equal(func.typeOf(''), 'string')
  assert.equal(func.typeOf({}), 'object')
  assert.equal(func.typeOf([]), 'array')
  assert.equal(func.typeOf(NaN), 'number')
  assert.equal(func.typeOf(/abc/), 'regexp')
  assert.equal(func.typeOf(true), 'boolean')
  assert.equal(func.typeOf(Math), 'math')
  assert.equal(func.typeOf(new Date()), 'date')
  assert.equal(func.typeOf(id), 'function')
  assert.end()
})
