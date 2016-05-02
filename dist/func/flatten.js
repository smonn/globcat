'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var typeOf = require('./typeof');

/**
 * Flattens nested arrays into a one-level array.
 * @param  {Array} enumerable - An array with nested arrays.
 * @return {Array} The flattened array.
 */
module.exports = function flatten(enumerable) {
  var result = [];

  if (typeOf(enumerable) === 'array') {
    result = enumerable.reduce(function (list, item) {
      if (typeOf(item) === 'array') {
        var inner = flatten(item);
        list.push.apply(list, _toConsumableArray(inner));
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