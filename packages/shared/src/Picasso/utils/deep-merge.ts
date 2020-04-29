function isPlainObject(item: unknown): item is Record<string, unknown> {
  return item && (item as object).constructor === Object
}

const deepmerge = (
  target: unknown,
  source: unknown,
  options = { clone: true }
) => {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    console.warn('Please, make sure that objects are passed as parameters')
    return {}
  }

  const output = options.clone ? { ...target } : target

  // TODO: reduce complexity
  Object.entries(source).forEach(([key, value]) => {
    if (isPlainObject(value) && key in target) {
      output[key] = deepmerge(target[key], value, options)
    } else {
      output[key] = value
    }
  })

  return output
}

export { deepmerge }
