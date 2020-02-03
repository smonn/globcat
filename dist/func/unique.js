'use strict';

function _contains(predicate, list) {
  var firstIndex = 0;
  return Boolean(list.filter(predicate)[firstIndex]);
}

module.exports = function (list) {
  var result = [];

  list.forEach(function (item) {
    if (!_contains(function (x) {
      return x === item;
    }, result)) {
      result.push(item);
    }
  });

  return result;
};