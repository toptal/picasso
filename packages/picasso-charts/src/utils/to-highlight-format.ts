import { ChartDataPoint } from '../LineChart/LineChart'

const toHighlightFormat = (
  data: string[],
  chartData: ChartDataPoint[],
  color: string,
  xAxisKey?: string
) =>
  data.map(highlight => {
    const from = chartData.findIndex(
      point => point[xAxisKey || 'x'] === highlight
    )
    const to = from + 1

    return { from, to, color }
  })

export default toHighlightFormat
