import { ChartDataPoint, HighlightConfig } from '@toptal/picasso-charts'

import { Highlight } from './../../AnalyticsChart'

const toHighlightFormat = (
  chartData: ChartDataPoint[],
  highlights: Highlight[],
  xAxisKey?: string
) => {
  const highlightConfig: HighlightConfig[] = []

  highlights.forEach(({ data, color }) => {
    data.forEach(section => {
      const from = chartData.findIndex(
        point => point[xAxisKey || 'x'] === section
      )
      const to = from + 1
      highlightConfig.push({ from, to, color })
    })
  })

  return highlightConfig
}

export default toHighlightFormat
