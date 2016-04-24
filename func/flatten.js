'use strict';

const typeOf = require('./typeof');

const flatten = function(enumerable) {
  let result = [];

  if (typeOf(enumerable) === 'array') {
    result = enumerable.reduce(function(list, item) {
      if (typeOf(item) === 'array') {
        let inner = flatten(item);
        list.push(...inner);
      } else {
        list.push(item);
      }

      return list;
    }, result);
  } else {
    result.push(enumerable);
  }

  return result;
};

module.exports = flatten;
