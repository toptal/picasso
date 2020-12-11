import { scaleLinear } from 'd3'
import { ticks } from 'd3-array'

import { HOUR, DAY } from '../../config'

const uniqBy = (array: any[]) =>
  array.filter((value, index, self) => self.indexOf(value) === index)

const getYAxisTicks = (
  bottomDomain: number,
  topDomain: number,
  unit?: string
) => {
  if (unit === 'minutes') {
    if (topDomain >= HOUR) {
      const interval = topDomain >= DAY * 2 ? DAY : HOUR

      const ticks = scaleLinear()
        .domain([0, topDomain / interval])
        .ticks(4)

      return uniqBy(ticks.map(Math.floor)).map(
        (tick: number) => tick * interval
      )
    }
  }

  return ticks(bottomDomain, topDomain, 4)
}

export default getYAxisTicks
