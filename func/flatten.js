'use strict'

const typeOf = require('./typeof')

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
