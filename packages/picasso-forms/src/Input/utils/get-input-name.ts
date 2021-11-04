const getInputName = (name?: string) => {
  if (name && /^[field|input|title]$/.test(name)) {
    return `${name}-picasso`
  }

  return name
}

export default getInputName
