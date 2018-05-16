module.exports = function(fn) {
  let value
  let called = false

  return function() {
    if (called) {
      return value
    }

    value = fn(...arguments)
    called = true

    return value
  }
}
