export function distinctValues<T>(list: T[]): T[] {
  return [...new Set(list)]
}
