import { ChartDataPoint, HighlightConfig } from '@toptal/picasso-charts'

import { Highlights } from './../../AnalyticsChart'

const toHighlightFormat = (
  chartData: ChartDataPoint[],
  highlights: Highlights,
  xAxisKey?: string
): HighlightConfig[] =>
  highlights.data.map(highlight => {
    const from = chartData.findIndex(
      point => point[xAxisKey || 'x'] === highlight
    )
    const to = from + 1
    return { from, to, color: highlights.color }
  })

export default toHighlightFormat
