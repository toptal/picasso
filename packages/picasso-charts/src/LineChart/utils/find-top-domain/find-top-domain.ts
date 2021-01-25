import { ChartDataPoint } from '../../../types'
import CHART_CONSTANTS from '../../../utils/constants'

const { BOTTOM_DOMAIN, TOP_DOMAIN_OFFSET } = CHART_CONSTANTS

const findTopDomain = (chartData: ChartDataPoint[], xAxisKey: string) =>
  Math.round(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    chartData.reduce((acc, { [xAxisKey]: _, ...yValues }) => {
      const maxY = Math.max(...(Object.values(yValues) as number[]))

      return maxY >= acc ? maxY : acc
    }, BOTTOM_DOMAIN) + TOP_DOMAIN_OFFSET
  )

export default findTopDomain
