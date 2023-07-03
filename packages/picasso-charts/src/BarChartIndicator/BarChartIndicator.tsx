import React from 'react'
import { Rectangle } from 'recharts'

const INDICATOR_SIZE = 16

export type Props = {
  color: string
  label: string
}

const BarChartIndicator = ({ color, label }: Props) => (
  <>
    <Rectangle
      width={INDICATOR_SIZE}
      height={INDICATOR_SIZE}
      x={-INDICATOR_SIZE / 2}
      y={-INDICATOR_SIZE / 2}
      fill={color}
      radius={2}
    />
    <text
      x={0}
      y={0}
      textAnchor='middle'
      alignmentBaseline='middle'
      fill='#fff'
      style={{ fontSize: 11, fontWeight: 600 }}
    >
      {label}
    </text>
  </>
)

export default BarChartIndicator
