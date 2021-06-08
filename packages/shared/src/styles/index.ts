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
  return color(inputColor).alpha(amount).toString()
}

// Approximate blending https://github.com/Qix-/color/issues/154
export const mix = (baseColor: string, mixColor: string, amount: number) => {
  const baseColorValue = color(baseColor)
  const mixColorValue = color(mixColor)

  return baseColorValue.mix(mixColorValue, amount).hex()
}

export const rem = (pxValue: string, baseFontSize = 16) =>
  `${Number.parseFloat(pxValue) / baseFontSize}rem`

export const pxFromRem = (remValue: string, baseFontSize = 16) =>
  `${Number.parseFloat(remValue) * baseFontSize}px`

export const outline = (baseColor: string, width = 3) => ({
  boxShadow: `0 0 0 ${width}px ${alpha(baseColor, 0.48)}`
})

export const remToNumber = (value: string) => Number.parseFloat(value)

export const rotate180 = (active: boolean) => ({
  transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transform: active ? 'rotate(180deg)' : undefined
})

export { default as addClassesToChildren } from './add-classes-to-children'

export * from './types'
