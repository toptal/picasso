import color from 'color'

// darken calculates based on the absolute color value
// https://github.com/Qix-/color/issues/53#issuecomment-487822576
export const darken = (inputColor: string, amount: number) => {
  const colorValue = color(inputColor)
  const lightness = colorValue.lightness()

  return colorValue.lightness(lightness - lightness * amount).hex()
}

// lighten calculates based on the absolute color value
// https://github.com/Qix-/color/issues/53#issuecomment-487822576
export const lighten = (inputColor: string, amount: number) => {
  const colorValue = color(inputColor)
  const lightness = colorValue.lightness()

  return colorValue.lightness(lightness + (100 - lightness) * amount).hex()
}

export const alpha = (inputColor: string, amount: number) => {
  return color(inputColor)
    .alpha(amount)
    .toString()
}

// Approximate blending https://github.com/Qix-/color/issues/154
export const mix = (baseColor: string, mixColor: string, amount: number) => {
  const baseColorValue = color(baseColor)
  const mixColorValue = color(mixColor)

  return baseColorValue.mix(mixColorValue, amount).hex()
}

export const stringToNumber = (value: string) => Number.parseFloat(value)

export const rem = (px: string, baseFontSize = 16) =>
  `${stringToNumber(px) / baseFontSize}rem`

export const outline = (baseColor: string, width = 3) => ({
  boxShadow: `0 0 0 ${width}px ${alpha(baseColor, 0.48)}`
})

// eslint-disable-next-line @typescript-eslint/no-shadow
export const px = (rem: string, baseFontSize = 16) =>
  `${stringToNumber(rem) * baseFontSize}px`

export { default as withClasses } from './withClasses'

export { createPropertiesStyles } from './createPropertiesStyles'

export * from './types'
