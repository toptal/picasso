const snakeToCamelCase = (snakeCase: string, capitalise = false): string => {
  const words = snakeCase.toLowerCase().split('_')
  const camelCase = words
    .map((word, index) => {
      if (!capitalise && index === 0) {
        return word
      }

      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('')

  return camelCase
}

export default snakeToCamelCase
