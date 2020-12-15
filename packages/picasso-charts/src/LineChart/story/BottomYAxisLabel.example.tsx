import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { LineChart } from '@toptal/picasso-charts'

const CHART_DATA = [
  { x: 'Oct 20', talents: 0 },
  { x: 'Oct 21', talents: 2 },
  { x: 'Oct 22', talents: 1.7 },
  { x: 'Oct 23', talents: 3 },
  { x: 'Oct 24', talents: 4.8 },
  { x: 'Oct 25', talents: 9.1 },
  { x: 'Oct 26', talents: 10 }
]

const Example = () => (
  <LineChart
    data={CHART_DATA}
    showBottomYAxisLabel
    lineConfig={{
      talents: { color: palette.blue.main }
    }}
  />
)

export default Example
