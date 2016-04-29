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

/**
 * Creates a curried function.
 * @param {Function} fn - Function to curry.
 * @param {Number} [arity=fn.length] - Number of arguments.
 * @returns {Function} The curried function.
 */
module.exports = function (fn, arity) {
  return _create(fn, [], arity)
}
