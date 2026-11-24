import React from 'react'
import { palette } from '@toptal/picasso-utils'
import { LineChart } from '@toptal/picasso-charts'
import { Page } from '@toptal/picasso'

const Example = () => (
  <Page.Content>
    <Page.Article>
      <LineChart
        aria-label='Talents per day'
        data={CHART_DATA}
        height={120}
        getYAxisTicks={([bottom, top]) => [bottom, (bottom + top) / 2, top]}
        tooltip
        allowTooltipEscapeViewBox
        lineConfig={{
          talents: { color: palette.blue.main },
        }}
      />
    </Page.Article>
  </Page.Content>
)

const CHART_DATA = [
  { x: 'Oct 20', talents: 1.7 },
  { x: 'Oct 21', talents: 2 },
  { x: 'Oct 22', talents: 1.7 },
  { x: 'Oct 23', talents: 2 },
  { x: 'Oct 24', talents: 1.5 },
  { x: 'Oct 25', talents: 2.7 },
  { x: 'Oct 26', talents: 3.7 },
]

export default Example
