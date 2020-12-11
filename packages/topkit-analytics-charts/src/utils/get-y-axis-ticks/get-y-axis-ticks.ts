import { scaleLinear } from 'd3'
import { ticks } from 'd3-array'

import { HOUR, DAY, NUMBER_OF_Y_AXIS_TICKS } from '../../config'

const uniqBy = (array: any[]) =>
  array.filter((value, index, self) => self.indexOf(value) === index)

const getYAxisTicks = (domain: [number, number], unit?: string) => {
  if (unit === 'minutes') {
    if (domain[1] >= HOUR) {
      const interval = domain[1] >= DAY * 2 ? DAY : HOUR

      const yAxisTicks = scaleLinear()
        .domain([0, domain[1] / interval])
        .ticks(4)

      return uniqBy(yAxisTicks.map(Math.floor)).map(
        (tick: number) => tick * interval
      )
    }
  }

  return ticks(domain[0], domain[1], NUMBER_OF_Y_AXIS_TICKS)
}

export default getYAxisTicks
