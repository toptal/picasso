import { ChartDataPoint } from '@toptal/picasso-charts'

type DatePoint = {
  [key: string]: number
}

const toChartFormat = (
  data: DatePoint,
  xAxisKeyName?: string,
  keyName?: string
): ChartDataPoint[] =>
  // converts an object of type { 'Oct 20': 1.7 } to [{ x: 'Oct 20', y: 1.7 }]
  Object.keys(data).map(date => ({
    [xAxisKeyName || 'x']: date,
    [keyName || 'y']: data[date]
  }))

export default toChartFormat
