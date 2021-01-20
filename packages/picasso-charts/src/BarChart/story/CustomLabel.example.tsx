import React from 'react'
import { BarChart, BarLabelProps } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'
import { ViewBox } from 'recharts'

const CHART_DATA = [
  {
    name: 'BMW',
    value: { crashes: 1500 }
  },
  {
    name: 'Mercedes',
    value: { crashes: 1400 }
  },
  {
    name: 'Ford',
    value: { crashes: 1000 }
  },
  {
    name: 'Toyota',
    value: { crashes: 1100 }
  },
  {
    name: 'Porsche',
    value: { crashes: 500 }
  }
]

const CustomLabel = ({ value, viewBox }: BarLabelProps) => {
  const width = (viewBox as ViewBox)?.width ?? 0
  const xPosition = (viewBox as ViewBox)?.x ?? 0
  const yPosition = (viewBox as ViewBox)?.y ?? 0

  return (
    <text
      x={xPosition + width / 2}
      y={yPosition}
      fill={palette.blue.main}
      style={{ fontSize: 14 }}
      textAnchor='middle'
      dy={-6}
    >
      {value}
    </text>
  )
}

const Example = () => (
  <BarChart
    data={CHART_DATA}
    fill={{ crashes: palette.blue.main }}
    label={CustomLabel}
  />
)

export default Example
