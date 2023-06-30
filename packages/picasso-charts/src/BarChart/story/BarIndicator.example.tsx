import React from 'react'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'
import { Label } from 'recharts'

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

const INDICATORS:any = {
  'Google': {color: palette.blue.light, label: 'A'},
  'Amazon': {color: palette.purple.main, label: 'B'},
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      data={CHART_DATA}
      getBarColor={() => palette.blue.main}
      getBarIndicator={({dataKey}) => {
        return <text
          x={0}
          y={0}
          textAnchor='middle'
          alignmentBaseline='middle'
          color='#fff'
          
        >B</text>
      }}
      width='100%'
    />
  </div>
)

export default Example
