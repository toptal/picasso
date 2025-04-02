import cx from 'classnames'
import { kebabToCamelCase } from '@toptal/picasso-provider'

// Base styles for all icons
export const baseIconClasses = 'fill-current inline-block align-[-.125em]'

// Color map for consistency across all icon components
export const colorClassMap: Record<string, string> = {
  green: 'text-green-main',
  darkGreen: 'text-green-dark',
  red: 'text-red-main',
  lightBlue: 'text-blue-light',
  blue: 'text-primary-main',
  yellow: 'text-yellow-main',
  white: 'text-white',
  lightGrey: 'text-grey-light2',
  grey: 'text-grey-main',
  darkGrey: 'text-text-primary',
  black: 'text-black',
  invert: 'text-white dark:text-black',
  inherit: 'text-inherit',
}

// Helper function to generate icon classes
export const getIconClassNames = (className?: string, color?: string) => {
  const classes = [baseIconClasses, className]

  if (color) {
    const colorClassName = kebabToCamelCase(color)

    if (colorClassMap[colorClassName]) {
      classes.push(colorClassMap[colorClassName])
    }
  }

  return cx(...classes)
}
