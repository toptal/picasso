export const omit = <T, K extends keyof T>(
  obj: T,
  keys: K | K[]
): Omit<T, K> => {
  const clone = { ...obj }
  const keysToOmit = Array.isArray(keys) ? keys : [keys]

  for (const key of keysToOmit) delete clone[key]

  return clone
}
