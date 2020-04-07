import { ReactNode } from 'react'

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

export interface MonthHeaderProps {
  switchMonth: (diff: number) => void
  activeMonth: Date
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

export interface CalendarProps {
  children?: ReactNode
}
