import { HOUR, DAY } from '../../config'

const formatYAxisTick = (
  value: number,
  domain: [number, number],
  unit?: string
) => {
  if (unit === 'minutes') {
    if (domain[1] >= DAY * 2) {
      return Math.floor(value / DAY) + 'd'
    }

    if (domain[1] >= HOUR) {
      return Math.floor(value / HOUR) + 'h'
    }

    return Math.floor(value) + 'm'
  }

  return `${value}`
}

export default formatYAxisTick
