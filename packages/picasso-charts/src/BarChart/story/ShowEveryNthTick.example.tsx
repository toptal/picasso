import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Jan',
    value: { recovered: 2400 },
  },
  {
    name: 'Feb',
    value: { recovered: 1398 },
  },
  {
    name: 'Mar',
    value: { recovered: 9800 },
  },
  {
    name: 'Apr',
    value: { recovered: 3908 },
  },
  {
    name: 'May',
    value: { recovered: 3900 },
  },
  {
    name: 'Jun',
    value: { recovered: 4200 },
  },
  {
    name: 'Jul',
    value: { recovered: 4500 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  infected: palette.blue.main,
  recovered: palette.green.dark,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      width='100%'
      height={300}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      showEveryNthTickOnXAxis={3}
      showEveryNthTickOnYAxis={0}
    />
  </div>
)

export default Example
