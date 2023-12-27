/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react'
import type { RenderRoot } from '@toptal/picasso-calendar-container'
import type { RenderDay } from '@toptal/picasso-calendar-day'
import type { RenderMonthHeader } from '@toptal/picasso-calendar-month-header'

/**
 * Context for passing values to underlying components (passing additional
 * properties via Components leads to event handling collision)
 */
const CalendarContext = React.createContext<{
  onDayMouseEnter?: (date: Date) => void
  renderRoot?: RenderRoot
  renderDay?: RenderDay
  renderMonthHeader?: RenderMonthHeader
}>({
  onDayMouseEnter: undefined,
  renderRoot: undefined,
  renderDay: undefined,
  renderMonthHeader: undefined,
})

export const useCalendar = () => useContext(CalendarContext)

export default CalendarContext
