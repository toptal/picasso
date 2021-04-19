import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

const CHART_DATA = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 }
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700 }
  },
  {
    name: 'Facebook',
    value: { 'engineers hired': 600 }
  },
  {
    name: 'Amazon',
    value: { 'engineers hired': 400 }
  },
  {
    name: 'Toptal',
    value: { 'engineers hired': 1000 }
  }
]

const Example = () => (
  <BarChart
    data={CHART_DATA}
    getBarColor={() => palette.blue.main}
    width={720}
    tooltip
  />
)

export default Example
