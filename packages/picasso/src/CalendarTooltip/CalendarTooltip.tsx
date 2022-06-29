import React from 'react'

import Tooltip from '../Tooltip'

export interface Props {
  tooltipIntervals?: { start: Date; end: Date; tooltip: string }[]
  date: Date
  children: React.ReactElement
}

export const CalendarTooltip = ({
  tooltipIntervals,
  date,
  children,
}: Props) => {
  const hasTooltip = (day: Date) => {
    if (!tooltipIntervals) {
      return null
    }

    for (let index = 0; index < tooltipIntervals.length; index++) {
      const interval = tooltipIntervals[index]

      if (interval.start <= day && day <= interval.end) {
        return interval.tooltip
      }
    }
  }

  const tooltip = hasTooltip(date)

  if (tooltip) {
    return (
      <Tooltip content={tooltip} placement='bottom' compact>
        {children}
      </Tooltip>
    )
  }

  return children
}
