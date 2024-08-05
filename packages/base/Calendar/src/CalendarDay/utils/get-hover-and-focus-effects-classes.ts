import type { DayState } from '../types'

const applyToHoverAndFocus = (className: string) =>
  `[&]:hover:${className} [&]:focus:${className}`

export const getHoverAndFocusEffectsClasses = (state: DayState) => {
  const {
    isSelected,
    isWeekend,
    isDisabled,
    isOutside,
    isRangeEnd,
    isRangeMiddle,
  } = state

  if (isDisabled || isSelected) {
    return ''
  }

  if (isRangeEnd) {
    // For Tailwind to pick classes up
    // [&]:hover:text-white [&]:hover:bg-blue-500
    // [&]:focus:text-white [&]:focus:bg-blue-500
    return `${applyToHoverAndFocus('text-white')} ${applyToHoverAndFocus(
      'bg-blue-500'
    )}`
  }

  // For Tailwind to pick classes up
  // [&]:hover:text-gray-600 [&]:hover:text-black
  // [&]:focus:text-gray-600 [&]:focus:text-black
  const defaultTextColor = isOutside
    ? applyToHoverAndFocus('text-gray-600')
    : applyToHoverAndFocus('text-black')

  // For Tailwind to pick classes up
  // [&]:hover:bg-blue-500/25 [&]:hover:rounded-sm
  // [&]:focus:bg-blue-500/25 [&]:focus:rounded-sm
  const defaultBackgroundAndBorderStyle = `${applyToHoverAndFocus(
    'bg-blue-500/25'
  )} ${applyToHoverAndFocus('rounded-sm')}`

  const defaultStyle = `${defaultTextColor} ${defaultBackgroundAndBorderStyle}`

  if (isWeekend && !isSelected && !isRangeMiddle) {
    // For Tailwind to pick classes up
    // [&]:hover:border-none [&]:hover:border-white
    // [&]:focus:border-none [&]:focus:border-white
    return `${applyToHoverAndFocus('border-none')} ${applyToHoverAndFocus(
      'border-white'
    )} ${defaultStyle}`
  }

  return defaultStyle
}
