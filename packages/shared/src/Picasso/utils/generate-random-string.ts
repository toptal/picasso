const generateRandomStringOrGetEmptyInTest = (base = '') => {
  if (process.env.NODE_ENV === 'test') {
    return base
  }

  return base + generateRandomString()
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substring(7)

export { generateRandomString, generateRandomStringOrGetEmptyInTest }
