import type { DayState } from '../types'

export const getTextColorClass = (state: DayState) => {
  const {
    isSelected,
    isOutside,
    isRangeEnd,
    isDisabled,
    isRangeMiddle,
    isRangeStart,
  } = state

  if (isDisabled) {
    return 'text-gray-500'
  }

  if (isOutside) {
    return 'text-gray-600'
  }

  if (isRangeMiddle) {
    return 'text-black'
  }

  if (isSelected || isRangeStart || isRangeEnd) {
    return 'text-white'
  }

  if (!isOutside) {
    return 'text-gray-600'
  }

  return 'text-black'
}
