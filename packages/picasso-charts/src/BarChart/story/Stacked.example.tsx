import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Training',
    value: {
      'q1 budget': 2000,
      'q1 actual': 1600,
      'q2 budget': 1672,
      'q2 actual': 1200,
    },
  },
  {
    name: 'Events',
    value: {
      'q1 budget': 1752,
      'q1 actual': 1423,
      'q2 budget': 1856,
      'q2 actual': 1452,
    },
  },
]

const COLORS_MAPPING: Record<string, string> = {
  'q1 budget': palette.blue.main,
  'q1 actual': palette.grey.dark,
  'q2 budget': palette.blue.light,
  'q2 actual': palette.grey.light,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      stackedBars={[
        ['q1 budget', 'q1 actual'],
        ['q2 budget', 'q2 actual'],
      ]}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      getBarLabelColor={() => palette.grey.dark}
      width='100%'
    />
  </div>
)

export default Example
