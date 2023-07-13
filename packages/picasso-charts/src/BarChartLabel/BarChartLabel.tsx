import React from 'react'
import type { LabelProps } from 'recharts'

import type { BarOptions } from '../types'

export type Props = {
  value?: LabelProps['value']
  viewBox?: { width?: number; x?: number; y?: number }
  getBarLabelColor?: (params: BarOptions) => string
  dataKey: string
  index?: number
}

const BarChartLabel = ({
  value,
  viewBox,
  getBarLabelColor,
  ...restProps
}: Props) => {
  const width = viewBox?.width ?? 0
  const xPosition = viewBox?.x ?? 0
  const yPosition = viewBox?.y ?? 0

  const fillColor = getBarLabelColor?.(restProps)

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={fillColor}
      style={{ fontSize: 11 }}
      textAnchor='middle'
      dy={-6}
    >
      {value}
    </text>
  )
}

export default BarChartLabel
