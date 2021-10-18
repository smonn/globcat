import typeOf from './typeof.js'

export default function defaults() {
  const sources = Array.prototype.slice.call(arguments)
  const target = {}

  return sources.reduce(function (dest, source) {
    source = source || {}
    Object.keys(source).forEach((key) => {
      if (typeOf(source[key]) === 'object') {
        dest[key] = defaults(dest[key] || {}, source[key] || {})
      } else {
        dest[key] = source[key]
      }
    })
    return dest
  }, target)
}
