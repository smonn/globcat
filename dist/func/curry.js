'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _create(fn, args, arity) {
  arity = arity || fn.length;

  return function fx() {
    args = args.concat(Array.prototype.slice.call(arguments));

    if (args.length >= arity) {
      return fn.apply(undefined, _toConsumableArray(args));
    }

    return _create(fn, args, arity);
  };
}

module.exports = function (fn, arity) {
  return _create(fn, [], arity);
};