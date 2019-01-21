import color from 'color'

export const darken = (inputColor, amount) =>
  color(inputColor)
    .darken(amount)
    .hex()

export const lighten = (inputColor, amount) =>
  color(inputColor)
    .lighten(amount)
    .hex()
