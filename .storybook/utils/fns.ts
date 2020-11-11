function merge<T extends { [key: string]: unknown }>(o1: T, o2: T | undefined) {
  if (!o2) return o1

  const destination = Object.assign({}, o1)

  Object.keys(o2).forEach(key => {
    if (destination[key]) {
      Object.assign(destination[key], o2[key])
    }
  })

  return destination
}

const mapValues = <T>(
  map: Record<string, T>,
  callback: (value: T, key: string) => unknown
) => {
  return Object.fromEntries(
    Object.entries(map).map(([key, value]) => [key, callback(value, key)])
  )
}

export { merge, mapValues }
