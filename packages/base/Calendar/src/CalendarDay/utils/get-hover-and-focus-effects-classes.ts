import type { DayState } from '../types'

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
    return [
      '[&]:hover:text-white [&]:focus:text-white',
      '[&]:hover:bg-blue-500 [&]:focus:bg-blue-500',
    ]
  }

  const defaultTextColor = isOutside
    ? '[&]:hover:text-gray-600 [&]:focus:text-gray-600'
    : '[&]:hover:text-black [&]:focus:text-black'

  const defaultBackgroundAndBorderStyle = [
    '[&]:hover:bg-blue-500/25 [&]:focus:bg-blue-500/25',
    '[&]:hover:rounded-sm [&]:focus:rounded-sm',
  ]

  const defaultStyles = [defaultTextColor, ...defaultBackgroundAndBorderStyle]

  if (isWeekend && !isSelected && !isRangeMiddle) {
    return [
      '[&]:hover:border-none [&]:focus:border-none',
      '[&]:hover:border-white [&]:focus:border-white',
      ...defaultStyles,
    ]
  }

  return defaultStyles
}
