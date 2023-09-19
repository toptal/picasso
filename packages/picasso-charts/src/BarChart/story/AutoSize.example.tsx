import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_6, palette } from '@toptal/picasso/utils'
import { BarChart } from '@toptal/picasso-charts'

const CHART_DATA = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 },
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700 },
  },
  {
    name: 'Facebook',
    value: { 'engineers hired': 600 },
  },
  {
    name: 'Amazon',
    value: { 'engineers hired': 400 },
  },
  {
    name: 'Toptal',
    value: { 'engineers hired': 1000 },
  },
]

const Example = () => (
  <div style={{ width: 720 }}>
    <Container bottom={SPACING_6}>
      <BarChart
        data={CHART_DATA}
        getBarColor={() => palette.blue.main}
        width='100%'
        tooltip
        maxBarSize={80}
        autoSize
      />
    </Container>
    <Container>
      <BarChart
        height={300}
        data={CHART_DATA}
        layout='vertical'
        getBarColor={() => palette.blue.main}
        width='100%'
        tooltip
        showBarLabel={false}
        maxBarSize={40}
        autoSize
      />
    </Container>
  </div>
)

export default Example
