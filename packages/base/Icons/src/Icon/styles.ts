import { kebabToCamelCase } from '@toptal/picasso-provider'

export const colorClassMap: Record<string, string> = {
  green: 'text-green-500',
  darkGreen: 'text-green-600',
  red: 'text-red-500',
  lightBlue: 'text-blue-400',
  blue: 'text-blue-500',
  yellow: 'text-yellow-500',
  white: 'text-white',
  lightGrey: 'text-gray-400',
  grey: 'text-gray-500',
  darkGrey: 'text-graphite-700',
  black: 'text-black',
  invert: 'text-white dark:text-black',
  inherit: 'text-inheritColor',
}

export const getColorClass = (color?: string) => {
  if (!color) {
    return ''
  }

  return colorClassMap[kebabToCamelCase(color)] || ''
}
