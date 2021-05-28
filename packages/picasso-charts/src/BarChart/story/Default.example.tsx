import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

const CHART_DATA = [
  {
    name: 'Claimed',
    value: { 'active talent': 23, 'potential talent': 30 }
  },
  {
    name: 'Contacted',
    value: { 'active talent': 5, 'potential talent': 9 }
  },
  {
    name: 'Approved',
    value: { 'active talent': 2, 'potential talent': 0 }
  },
  {
    name: 'Verified',
    value: { 'active talent': 2, 'potential talent': 0 }
  },
  {
    name: 'With a Deposit',
    value: { 'active talent': 2, 'potential talent': 0 }
  },
  {
    name: 'With an Active engagement',
    value: { 'active talent': 1, 'potential talent': 0 }
  }
]

const COLORS_MAPPING: Record<string, string> = {
  'active talent': palette.blue.main,
  'potential talent': palette.grey.dark
}

const Example = () => (
  <BarChart
    data={CHART_DATA}
    getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
    getBarLabelColor={() => palette.grey.dark}
    width={720}
  />
)

export default Example
