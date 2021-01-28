import { palette } from '@toptal/picasso/utils'
import React from 'react'
import { LabelProps } from 'recharts'

export type Props = {
  value?: LabelProps['value']
  viewBox?: { width?: number; x?: number; y?: number }
  color?: string
}

const BarChartLabel = ({ value, viewBox, color }: Props) => {
  const width = viewBox?.width ?? 0
  const xPosition = viewBox?.x ?? 0
  const yPosition = viewBox?.y ?? 0

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={color}
      style={{ fontSize: 11 }}
      textAnchor='middle'
      dy={-6}
    >
      {value}
    </text>
  )
}

BarChartLabel.defaultProps = {
  color: palette.grey.dark
}

export default BarChartLabel
