const generateRandomString = (base = '') => {
  if (process.env.NODE_ENV === 'test') return base

  return (
    base +
    Math.random()
      .toString(36)
      .substring(7)
  )
}

export { generateRandomString }
