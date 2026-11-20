import type { ReactNode } from 'react'

export interface DayProps {
  isDisabled: boolean
  isSelected: boolean
  isSelectable: boolean
  isToday: boolean
  isMonthNext: boolean
  isMonthPrev: boolean
  isSelectionStart: boolean
  isSelectionEnd: boolean
  handleOnClick: () => void
  handleOnEnter: () => void
  date: Date
  ISODate: string
  getDayFormatted: (date: Date) => string
  key?: string
  children?: ReactNode
}

export interface WeekProps {
  children?: ReactNode
}

export interface DayOfWeekProps {
  day: string
  key: string
  children?: ReactNode
}

export interface DaysOfWeekProps {
  children?: ReactNode
}

export type CalendarDateRange = { start: Date; end: Date }

export type DateOrDateRangeType = Date | DateRangeType

export type DateRangeType = [start: Date, end: Date]

export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
