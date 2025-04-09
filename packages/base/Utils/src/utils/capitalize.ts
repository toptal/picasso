export const capitalize = (string: string) => {
  if (typeof string !== 'string') {
    throw new Error('Picasso: capitalize(string) expects a string argument.')
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}
