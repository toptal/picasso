const generateRandomString = (base = '') => {
  if (process.env.NODE_ENV === 'test') return base

  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  return (
    base +
    Math.random()
      .toString(36)
      .substring(7)
  )
}

export { generateRandomString }
