import React from 'react'
import { BarChart, BarChartIndicator } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  {
    name: 'Google',
    value: {
      breakAmount: 2000,
      spendAmount: 1600,
    },
  },
  {
    name: 'Amazon',
    value: {
      breakAmount: 1752,
      spendAmount: 1423,
    },
  },
]

const INDICATORS: any = {
  Google: { color: palette.blue.light, label: 'E' },
  Amazon: { color: palette.purple.main, label: 'E' },
}

const COLORS_MAPPING: Record<string, string> = {
  breakAmount: palette.blue.main,
  spendAmount: palette.grey.dark,
}

const Example = () => (
  <div style={{ width: 720 }}>
    <BarChart
      width='100%'
      data={CHART_DATA as any}
      stackedBars={[['breakAmount', 'spendAmount']]}
      getBarColor={({ dataKey }) => COLORS_MAPPING[dataKey]}
      renderBarIndicators={({ dataKey, dataItem }) => {
        const indicator = INDICATORS[dataKey]
        const valueKey = dataItem?.tooltipPayload?.[0]?.dataKey

        if (indicator && valueKey === 'breakAmount') {
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
