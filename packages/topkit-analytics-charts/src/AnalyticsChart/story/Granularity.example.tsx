import React from 'react'
import { format, parseISO, addHours } from 'date-fns'
import { palette } from '@toptal/picasso/utils'
import { AnalyticsChart } from '@topkit/analytics-charts'

const CHART_DATA_DAY = [
  {
    id: 'global',
    values: {
      '2020-11-10': 684.18,
      '2020-11-11': 843.88,
      '2020-11-12': 950.23,
      '2020-11-13': 1049.47,
      '2020-11-14': 1220,
      '2020-11-15': 1294.53,
      '2020-11-16': 1406.08,
      '2020-11-17': 1865.98,
      '2020-11-18': 2430.15,
      '2020-11-19': 2740,
      '2020-11-20': 3347.23,
      '2020-11-21': 3777.12,
      '2020-11-22': 4107.37,
      '2020-11-23': 4157.9,
      '2020-11-24': 4385.87,
      '2020-11-25': 4499.3,
      '2020-11-26': 4306.65,
      '2020-11-27': 4277.67,
      '2020-11-28': 4760,
      '2020-11-29': 5229.86,
      '2020-11-30': 5436.27,
      '2020-12-01': 5399.07,
      '2020-12-02': 5375.63,
      '2020-12-03': 5443.1,
      '2020-12-04': 5015.43,
      '2020-12-05': 3494.52,
      '2020-12-06': 2700,
      '2020-12-07': 2516.31,
      '2020-12-08': 1944.33,
      '2020-12-09': 802.15
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
      unit='minutes'
      formatXAxisLabel={label => format(parseISO(label), 'MMM dd')}
      showBottomYAxisLabel
    />

    <h3>Granularity: hour</h3>
    <AnalyticsChart
      data={CHART_DATA_HOUR}
      lineConfig={{
        global: { color: palette.blue.main }
      }}
      granularity='hour'
      unit='minutes'
      formatXAxisLabel={label => format(addHours(parseISO(label), 1), 'ha')}
      showBottomYAxisLabel
    />
  </>
)

export default Example
