import { ChartDataPoint, HighlightConfig } from '@toptal/picasso-charts'

import { Highlight } from './../../AnalyticsChart'

const HIGHLIGHT_LENGTH = 1

const toHighlightFormat = (
  chartData: ChartDataPoint[],
  highlights: Highlight[],
  xAxisKey: string
): HighlightConfig[] =>
  highlights
    .map(({ data, color }) => data.map(section => ({ section, color })))
    .reduce((acc, arr) => acc.concat(arr), [])
    .map(({ section, color }) => {
      const from = chartData.findIndex(point => point[xAxisKey] === section)
      const to = from + HIGHLIGHT_LENGTH

      return { from, to, color }
    })

export default toHighlightFormat
