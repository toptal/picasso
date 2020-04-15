import { ChartDataPoint, HighlightConfig } from '@toptal/picasso-charts'

import { Highlight } from './../../AnalyticsChart'

const HIGHLIGHT_LENGTH = 1

const toHighlightFormat = (
  chartData: ChartDataPoint[],
  highlights: Highlight[],
  xAxisKey: string,
  formatLabel: (label: string) => string
): HighlightConfig[] =>
  highlights
    .map(({ data, color }) => data.map(section => ({ section, color })))
    .flat()
    .map(({ section, color }) => {
      const formattedSection = formatLabel(section)
      const from = chartData.findIndex(
        point => point[xAxisKey] === formattedSection
      )
      const to = from + HIGHLIGHT_LENGTH

      return { from, to, color }
    })

export default toHighlightFormat
