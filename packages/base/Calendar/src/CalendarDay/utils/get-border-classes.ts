import type { DayState } from '../types'

export const getBorderClasses = (state: DayState) => {
  const { isSelected, isWeekend, isRangeStart, isRangeEnd, isRangeMiddle } =
    state

  if (isRangeMiddle) {
    return 'border-none rounded-none'
  }

  if (isRangeEnd || isRangeStart || isSelected) {
    return 'border-none rounded-sm'
  }

  if (isWeekend) {
    return 'border-solid border-[0.25rem] border-white rounded-md'
  }

  return 'border-none rounded-none'
}
