'use strict'

const typeOf = require('./typeof')

/**
 * Flattens nested arrays into a one-level array.
 * @param  {Array} enumerable - An array with nested arrays.
 * @return {Array} The flattened array.
 */
module.exports = function flatten (enumerable) {
  let result = []

  if (typeOf(enumerable) === 'array') {
    result = enumerable.reduce((list, item) => {
      if (typeOf(item) === 'array') {
        let inner = flatten(item)
        list.push(...inner)
      } else {
        list.push(item)
      }

      return list
    }, result)
  } else {
    result.push(enumerable)
  }

  return result
}
