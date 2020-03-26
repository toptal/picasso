import { ChartDataPoint } from '../LineChart/LineChart'
import CHART_CONSTANTS from './constants'

const { BOTTOM_DOMAIN, TOP_DOMAIN_OFFSET } = CHART_CONSTANTS

const calcTopDomain = (chartData: ChartDataPoint[], xAxisKey: string) =>
  Math.round(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    chartData.reduce((acc, { [xAxisKey]: _, ...yValues }) => {
      const maxY = Math.max(...(Object.values(yValues) as number[]))
      return maxY >= acc ? maxY : acc
    }, BOTTOM_DOMAIN) + TOP_DOMAIN_OFFSET
  )

export default calcTopDomain
