import color from 'color'

export const darken = (inputColor, amount) =>
  color(inputColor)
    .darken(amount)
    .hex()

export const lighten = (inputColor, amount) =>
  color(inputColor)
    .lighten(amount)
    .hex()

export { default as withClasses } from './withClasses'

export { createPropertiesStyles } from './createPropertiesStyles'
