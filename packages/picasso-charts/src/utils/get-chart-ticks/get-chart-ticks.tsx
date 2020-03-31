import { OrderedChartDataPoint } from '../..'

const getChartTicks = (orderedData: OrderedChartDataPoint[]) =>
  orderedData.map(({ order }) => order)

export default getChartTicks
