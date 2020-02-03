'use strict'

function _create (fn, args, arity) {
  arity = arity || fn.length

  return function fx () {
    args = args.concat(Array.prototype.slice.call(arguments))

    if (args.length >= arity) {
      return fn(...args)
    }

    return _create(fn, args, arity)
  }
}

module.exports = function (fn, arity) {
  return _create(fn, [], arity)
}
