import React from 'react'

import { ChartDataPoint } from '../types'

export const ChartDot = ({
  cx,
  cy,
  dataKey,
  color,
  payload
}: {
  cx?: number
  dataKey?: string
  payload?: ChartDataPoint
  cy?: number
  value?: number | string | null
  color: string
}) => {
  const isEmptyValue = !payload || payload[`${dataKey}IsEmpty`]

  return (
    <circle
      r={3}
      cx={cx}
      cy={cy}
      strokeWidth={1}
      stroke={color}
      strokeDasharray='none'
      fill={isEmptyValue ? 'white' : color}
    />
  )
}
