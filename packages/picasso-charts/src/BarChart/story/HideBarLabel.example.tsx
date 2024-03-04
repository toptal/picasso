import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Banana',
    value: { protein: 27, carbs: 1.3, fat: 0.4 },
  },
  {
    name: 'Egg',
    value: { protein: 6, carbs: 0.6, fat: 5 },
  },
  {
    name: 'Red meat',
    value: { protein: 19, carbs: 0, fat: 23 },
  },
  {
    name: 'Peanut',
    value: { protein: 7.3, carbs: 4.6, fat: 14 },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  protein: palette.blue.main,
  carbs: palette.green.main,
  fat: palette.red.main,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      width='100%'
      tooltip
      showBarLabel={false}
    />
  </div>
)

export default Example
