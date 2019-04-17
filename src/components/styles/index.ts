import color from 'color'

export const darken = (inputColor: string, amount: number) =>
  color(inputColor)
    .darken(amount)
    .hex()

export const lighten = (inputColor: string, amount: number) =>
  color(inputColor)
    .lighten(amount)
    .hex()

export { default as withClasses } from './withClasses'

export { createPropertiesStyles } from './createPropertiesStyles'
