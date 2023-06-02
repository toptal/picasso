import React from 'react'
import { BarChart, BarChartIndicator } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'
import type { BarOptions } from '@toptal/picasso-charts/types'

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

const INDICATORS: any = {
  Google: { color: palette.blue.light, label: 'A' },
  Amazon: { color: palette.purple.main, label: 'B' },
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      width='100%'
      data={CHART_DATA}
      getBarColor={() => palette.blue.main}
      renderBarIndicators={({ dataKey }: BarOptions) => {
        const indicator = INDICATORS[dataKey]

        if (indicator) {
          return (
            <BarChartIndicator
              label={indicator.label}
              color={indicator.color}
            />
          )
        }

        return <></>
      }}
    />
  </div>
)

export default Example
