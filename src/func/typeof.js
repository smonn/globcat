export default function (x) {
  const firstMatch = 1
  const regexp = /^\[object (.*)\]$/
  return Object.prototype.toString
    .call(x)
    .match(regexp)
    [firstMatch].toLowerCase()
}
