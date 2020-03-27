import { ChartDataPoint } from '@toptal/picasso-charts'

import { DatePoint } from './../../AnalyticsChart/AnalyticsChart'

const toChartFormat = (
  data: DatePoint,
  xAxisKeyName?: string,
  keyName?: string
): ChartDataPoint[] =>
  Object.keys(data).map(date => ({
    [xAxisKeyName || 'x']: date,
    [keyName || 'y']: data[date]
  }))

export default toChartFormat
