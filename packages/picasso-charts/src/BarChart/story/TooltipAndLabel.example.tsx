import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

const CHART_DATA = [
  {
    name: 'Apples',
    value: { eaten: 500 }
  },
  {
    name: 'Peaches',
    value: { eaten: 700 }
  },
  {
    name: 'Lemons',
    value: { eaten: 600 }
  },
  {
    name: 'Bananas',
    value: { eaten: 400 }
  }
]

const Example = () => (
  <BarChart
    data={CHART_DATA}
    fill={{ eaten: palette.green.main }}
    label
    tooltip
  />
)

export default Example
