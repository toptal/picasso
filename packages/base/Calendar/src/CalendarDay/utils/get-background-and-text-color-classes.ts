import type { DayState } from '../types'

export const getBackgroundAndTextColorClasses = (state: DayState) => {
  const {
    isSelected,
    isOutside,
    isRangeEnd,
    isDisabled,
    isWeekend,
    isRangeMiddle,
    isRangeStart,
  } = state

  if (isRangeMiddle) {
    return 'bg-blue-100 text-black'
  }

  if (isSelected || isRangeStart || isRangeEnd) {
    return 'bg-blue-500 text-white'
  }

  if (isDisabled) {
    return `text-gray-500 ${isWeekend ? 'bg-gray-100' : 'bg-white'}`
  }

  if (isWeekend) {
    let textColor = 'text-black'

    if (isOutside && !isSelected && !isRangeMiddle) {
      textColor = 'text-gray-600'
    }

    return `bg-gray-100 ${textColor}`
  }

  if (isOutside && !isDisabled) {
    return 'bg-white text-gray-600'
  }

  return 'bg-white text-black'
}
