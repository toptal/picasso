import { OrderedChartDataPoint } from '../../types'

const getChartTicks = (orderedData: OrderedChartDataPoint[]) =>
  orderedData.map(({ order }) => order)

export default getChartTicks
