import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

const CHART_DATA = [
  {
    name: 'Claimed',
    value: {
      'active talent': 23,
      viable: 7,
      'bad leads': 8,
      rejected: 15
    }
  },
  {
    name: 'Contacted',
    value: { 'active talent': 5, 'potential talent': 9 }
  },
  {
    name: 'Approved',
    value: { 'active talent': 2, 'potential talent': 1 }
  },
  {
    name: 'Verified',
    value: { 'active talent': 2, 'potential talent': 2 }
  },
  {
    name: 'With a Deposit',
    value: { 'active talent': 2, 'potential talent': 3 }
  },
  {
    name: 'With an Active engagement',
    value: { 'active talent': 1, 'potential talent': 4 }
  }
]

const COLORS_MAPPING: Record<string, string> = {
  'active talent': palette.blue.main,
  'potential talent': palette.grey.dark,
  viable: 'green',
  'bad leads': 'yellow',
  rejected: 'blue'
}

const Example = () => (
  <BarChart
    dataKeys={[
      'active talent',
      'potential talent',
      'viable',
      'bad leads',
      'rejected'
    ]}
    data={CHART_DATA}
    getBarColor={dataKey => COLORS_MAPPING[dataKey]}
    getBarLabelColor={() => palette.grey.dark}
    width={720}
    getBarStackId={dataKey =>
      dataKey === 'viable' || dataKey === 'bad leads' || dataKey === 'rejected'
        ? 'a'
        : undefined
    }
    tooltip
  />
)

export default Example
