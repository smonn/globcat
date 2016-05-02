'use strict';

module.exports = function (fn) {
  var value = void 0;
  var called = false;

  return function () {
    if (called) {
      return value;
    }

    value = fn.apply(undefined, arguments);
    called = true;

    return value;
  };
};