import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Banana',
    value: { protein: 27, fat: 0.4 },
  },
  {
    name: 'Egg',
    value: { protein: 6, fat: 5 },
  },
  {
    name: 'Red meat',
    value: { protein: 19, fat: 23 },
  },
  {
    name: 'Peanut',
    value: { protein: 7.3, fat: 14 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  protein: palette.blue.main,
  carbs: palette.green.main,
  fat: palette.red.main,
}

const Example = () => (
  <div style={{ width: 820 }}>
    <BarChart
      data={CHART_DATA}
      layout='vertical'
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      width='100%'
      tooltip
      showBarLabel={false}
    />
  </div>
)

export default Example
