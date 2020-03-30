import { ChartDataPoint, HighlightConfig } from '@toptal/picasso-charts'

import { Highlight } from './../../AnalyticsChart'

const toHighlightFormat = (
  chartData: ChartDataPoint[],
  highlights: Highlight[],
  xAxisKey?: string
): HighlightConfig[] =>
  highlights
    .map(({ data, color }) => data.map(section => ({ section, color })))
    .reduce((acc, arr) => acc.concat(arr), [])
    .map(({ section, color }) => {
      const from = chartData.findIndex(
        point => point[xAxisKey || 'x'] === section
      )
      const to = from + 1
      return { from, to, color }
    })

export default toHighlightFormat
