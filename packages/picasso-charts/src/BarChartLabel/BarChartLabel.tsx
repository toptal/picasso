import { palette } from '@toptal/picasso/utils'
import React from 'react'
import { LabelProps, ViewBox } from 'recharts'

export type Props = {
  value?: LabelProps['value']
  viewBox?: ViewBox
}

const BarChartLabel = ({ value, viewBox }: Props) => {
  const width = viewBox?.width ?? 0
  const xPosition = viewBox?.x ?? 0
  const yPosition = viewBox?.y ?? 0

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={palette.grey.dark}
      style={{ fontSize: 11 }}
      textAnchor='middle'
      dy={-6}
    >
      {value}
    </text>
  )
}

export default BarChartLabel
