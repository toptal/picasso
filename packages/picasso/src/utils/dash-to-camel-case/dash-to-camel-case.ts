export const dashToCamelCase = (input: string) =>
  input.replace(/-([a-z])/g, word => word[1].toUpperCase())
