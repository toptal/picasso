import React from 'react'

import type { RenderDay } from '../CalendarDay'
import type { RenderMonthHeader } from '../CalendarMonthHeader'

/**
 * Context for passing values to underlying components (passing additional
 * properties via Components leads to event handling collision)
 */
const CalendarContext = React.createContext<{
  onDayMouseEnter?: (date: Date) => void
  renderDay?: RenderDay
  renderMonthHeader?: RenderMonthHeader
}>({
  onDayMouseEnter: undefined,
  renderDay: undefined,
  renderMonthHeader: undefined,
})

export default CalendarContext
