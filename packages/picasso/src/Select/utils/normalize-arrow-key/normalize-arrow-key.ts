import { KeyboardEvent } from 'react'

const normalizeArrowKey = (event: KeyboardEvent<HTMLInputElement>) => {
  const { key, keyCode } = event

  // compatibility for older browsers
  // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript/9310900#comment91057577_44213036
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`
  }

  return key
}

export default normalizeArrowKey
