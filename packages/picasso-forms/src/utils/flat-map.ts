export const flatMap = <T, K>(arr: T[], fn: (item: T) => K[]) =>
  arr.reduce<K[]>((acc, item) => acc.concat(fn(item)), [])

export default flatMap
