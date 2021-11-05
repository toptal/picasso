const NAMES_NEED_POSTFIX = ['field', 'input', 'title']

const getInputName = (name?: string) => {
  if (name && NAMES_NEED_POSTFIX.includes(name)) {
    return `${name}-picasso`
  }

  return name
}

export default getInputName
