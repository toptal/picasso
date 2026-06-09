// Not equivalent to `text-transform: capitalize` — only the first letter of
// the whole string is uppercased, not the first letter of each word.
export const capitalize = (string: string): string => {
  if (typeof string !== 'string') {
    throw new Error('Picasso: capitalize(string) expects a string argument.')
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}
