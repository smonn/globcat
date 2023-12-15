import { assert, test } from 'vitest'
import { distinctValues } from './distinct-values.js'

test('should filter out duplicate values', () => {
  const list = ['foo', 'bar', 'baz', 'foo']
  const expected = ['bar', 'baz', 'foo']
  assert.deepEqual(
    distinctValues(list),
    expected,
    'should only contain once of each value'
  )
})
