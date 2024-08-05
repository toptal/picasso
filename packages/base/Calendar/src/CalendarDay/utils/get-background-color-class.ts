import type { DayState } from '../types'

export const getBackgroundColorClass = (state: DayState) => {
  const {
    isSelected,
    isRangeEnd,
    isDisabled,
    isWeekend,
    isRangeMiddle,
    isRangeStart,
  } = state

  if (isRangeMiddle) {
    return 'bg-blue-100'
  }

  if (isSelected || isRangeStart || isRangeEnd) {
    return 'bg-blue-500'
  }

  if ((isDisabled && isWeekend) || isWeekend) {
    return 'bg-gray-100'
  }

  return 'bg-white'
}
