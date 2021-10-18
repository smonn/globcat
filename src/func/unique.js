function _contains(predicate, list) {
  const firstIndex = 0
  return Boolean(list.filter(predicate)[firstIndex])
}

export default function (list) {
  let result = []

  list.forEach(function (item) {
    if (!_contains((x) => x === item, result)) {
      result.push(item)
    }
  })

  return result
}
