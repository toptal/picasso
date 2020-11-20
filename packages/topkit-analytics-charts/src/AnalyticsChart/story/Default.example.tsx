import React from 'react'
import { format, parseISO, addHours } from 'date-fns'
import { palette } from '@toptal/picasso/utils'
import { AnalyticsChart } from '@topkit/analytics-charts'

const CHART_DATA_DAY = [
  {
    id: 'global',
    values: {
      '2020-10-19': 31.01,
      '2020-10-20': 3.68,
      '2020-10-21': 4.12,
      '2020-10-22': 7.1,
      '2020-10-23': 7.78,
      '2020-10-24': 4.9,
      '2020-10-25': 5.6,
      '2020-10-26': 7.16,
      '2020-10-27': 7.14,
      '2020-10-28': 9.89,
      '2020-10-29': 10.52,
      '2020-10-30': 10.66,
      '2020-10-31': 4.94,
      '2020-11-01': 5.85,
      '2020-11-02': 10.96,
      '2020-11-03': 5.57,
      '2020-11-04': 5.6,
      '2020-11-05': 6.6,
      '2020-11-06': 11.54,
      '2020-11-07': 4.81,
      '2020-11-08': 19.09,
      '2020-11-09': 9.99,
      '2020-11-10': 7.64,
      '2020-11-11': 10.09,
      '2020-11-12': 8.15,
      '2020-11-13': 9.96,
      '2020-11-14': 4.8,
      '2020-11-15': 4.47,
      '2020-11-16': 9.59,
      '2020-11-17': 11.27,
      '2020-11-18': 11.63
    }
  }
]

const CHART_DATA_HOUR = [
  {
    id: 'global',
    values: {
      '2020-11-18 02:59:59': 5.2,
      '2020-11-18 03:59:59': 8.63,
      '2020-11-18 04:59:59': 6.5,
      '2020-11-18 05:59:59': 18.3,
      '2020-11-18 06:59:59': 23.87,
      '2020-11-18 07:59:59': 35.5,
      '2020-11-18 08:59:59': 16.67,
      '2020-11-18 09:59:59': 12.83,
      '2020-11-18 10:59:59': 18.08,
      '2020-11-18 11:59:59': 10.75,
      '2020-11-18 12:59:59': 19.89,
      '2020-11-18 13:59:59': 5.25,
      '2020-11-18 14:59:59': 6.17,
      '2020-11-18 15:59:59': 12.3,
      '2020-11-18 16:59:59': 8.67,
      '2020-11-18 17:59:59': 2.56,
      '2020-11-18 18:59:59': 4,
      '2020-11-18 19:59:59': 8,
      '2020-11-18 20:59:59': 1.78,
      '2020-11-18 21:59:59': 5.92,
      '2020-11-18 22:59:59': 20.5,
      '2020-11-18 23:59:59': null,
      '2020-11-19 00:59:59': null,
      '2020-11-19 01:59:59': null
    }
  }
]

const Example = () => (
  <>
    <h3>Granularity: day</h3>
    <AnalyticsChart
      data={CHART_DATA_DAY}
      lineConfig={{
        global: { color: palette.blue.main }
      }}
      granularity='day'
      formatXAxisLabel={label => format(parseISO(label), 'MMM dd')}
      showEvenYAxisTicks
      showBottomYAxisLabel
    />

    <h3>Granularity: hour</h3>
    <AnalyticsChart
      data={CHART_DATA_HOUR}
      lineConfig={{
        global: { color: palette.blue.main }
      }}
      granularity='hour'
      formatXAxisLabel={label => format(addHours(parseISO(label), 1), 'ha')}
      showEvenYAxisTicks
      showBottomYAxisLabel
    />
  </>
)

export default Example
