import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { LineChart } from '@toptal/picasso-charts'

const HIGHLIGHTS = [
  {
    from: 6,
    to: 8,
    color: palette.yellow.main
  }
]

const CHART_DATA = [
  { x: 'Oct 20', talents: 1.7 },
  { x: 'Oct 21', talents: 2 },
  { x: 'Oct 22', talents: 1.7 },
  { x: 'Oct 23', talents: 2 },
  { x: 'Oct 24', talents: 1.5 },
  { x: 'Oct 25', talents: 1.3 },
  { x: 'Oct 26', talents: 1.6 },
  { x: 'Oct 27', talents: 2.7 },
  { x: 'Oct 28', talents: 3.7 },
  { x: 'Oct 29', talents: 1.7 },
  { x: 'Oct 30', talents: 1.5 },
  { x: 'Oct 31', talents: 1.6 },
  { x: 'Nov 01', talents: 2 },
  { x: 'Nov 02', talents: 1.5 },
  { x: 'Nov 03', talents: 1.3 },
  { x: 'Nov 04', talents: 1.5 },
  { x: 'Nov 05', talents: 1.5 },
  { x: 'Nov 06', talents: 1.8 },
  { x: 'Nov 07', talents: 1.6 },
  { x: 'Nov 08', talents: 2 },
  { x: 'Nov 09', talents: 2 },
  { x: 'Nov 10', talents: 3.1 }
]

const Example = () => (
  <LineChart
    data={CHART_DATA}
    highlightsData={HIGHLIGHTS}
    lines={{
      talents: { color: palette.blue.main }
    }}
  />
)

export default Example
