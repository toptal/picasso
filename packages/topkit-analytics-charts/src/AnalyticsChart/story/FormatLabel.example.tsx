import React from 'react'
import { format, parseISO } from 'date-fns'
import { palette } from '@toptal/picasso/utils'
import { AnalyticsChart } from '@topkit/analytics-charts'

const CHART_DATA = [
  {
    id: 'role',
    values: {
      '2020-10-20': 1.7,
      '2020-10-21': 2,
      '2020-10-22': 1.7,
      '2020-10-23': 2,
      '2020-10-24': 1.5,
      '2020-10-25': 1.3,
      '2020-10-26': 1.6,
      '2020-10-27': 2.7,
      '2020-10-28': 3.7,
      '2020-10-29': 1.7,
      '2020-10-30': 1.5,
      '2020-10-31': 1.6,
      '2020-11-01': 2,
      '2020-11-02': 1.5,
      '2020-11-03': 1.3,
      '2020-11-04': 1.5,
      '2020-11-05': 1.5,
      '2020-11-06': 1.8,
      '2020-11-07': 1.6,
      '2020-11-08': 2,
      '2020-11-09': 2,
      '2020-11-10': 3.1,
    },
  },
]

const Example = () => (
  <AnalyticsChart
    data={CHART_DATA}
    lineConfig={{
      role: { color: palette.blue.main },
    }}
    formatXAxisLabel={(label: string) => format(parseISO(label), 'MMM dd')}
  />
)

export default Example
