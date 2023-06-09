import React, { useContext } from 'react'

import type { RenderRoot } from '../CalendarContainer'
import type { RenderDay } from '../CalendarDay'
import type { RenderMonthHeader } from '../CalendarMonthHeader'

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
