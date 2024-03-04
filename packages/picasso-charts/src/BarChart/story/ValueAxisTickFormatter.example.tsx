import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Jan',
    value: { amount: 1000 },
  },
  {
    name: 'Feb',
    value: { amount: 2000 },
  },
  {
    name: 'Mar',
    value: { amount: 5000 },
  },
  {
    name: 'Apr',
    value: { amount: 10000 },
  },
  {
    name: 'May',
    value: { amount: 9000 },
  },
  {
    name: 'Jun',
    value: { amount: 3000 },
  },
  {
    name: 'Jul',
    value: { amount: 1000 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  amount: palette.green.dark,
}

const valueAxisFormatter = (value: number) => {
  return `$${value / 1000}k`
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      width='100%'
      height={300}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      valueAxisTickFormatter={valueAxisFormatter}
    />
  </div>
)

export default Example
