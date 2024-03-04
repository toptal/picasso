import React from 'react'
import { BarChart, BarChartIndicator } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 },
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700, isEnterprise: true },
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
  Google: { color: palette.blue.light, label: 'E' },
  Amazon: { color: palette.purple.main, label: 'E' },
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      width='100%'
      data={CHART_DATA as any}
      getBarColor={() => palette.blue.main}
      renderBarIndicators={({ dataKey, dataItem }) => {
        const indicator = INDICATORS[dataKey]
        const isEnterprise = dataItem?.value?.isEnterprise

        if (indicator && isEnterprise) {
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
