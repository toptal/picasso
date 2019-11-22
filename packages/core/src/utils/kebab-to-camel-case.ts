const kebabToCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase())

export default kebabToCamelCase
