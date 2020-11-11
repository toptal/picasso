// Taken from https://github.com/d3/d3-array/blob/master/src/ticks.js
/* eslint-disable */

var e10 = Math.sqrt(50),
  e5 = Math.sqrt(10),
  e2 = Math.sqrt(2)

const getD3Ticks = (start: number, stop: number, count: number) => {
  var reverse,
    index = -1,
    n,
    ticks,
    step

  ;(stop = +stop), (start = +start), (count = +count)
  if (start === stop && count > 0) return [start]
  if ((reverse = stop < start)) (n = start), (start = stop), (stop = n)
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step))
    return []

  if (step > 0) {
    start = Math.ceil(start / step)
    stop = Math.floor(stop / step)
    ticks = new Array((n = Math.ceil(stop - start + 1)))
    while (++index < n) ticks[index] = (start + index) * step
  } else {
    step = -step
    start = Math.ceil(start * step)
    stop = Math.floor(stop * step)
    ticks = new Array((n = Math.ceil(stop - start + 1)))
    while (++index < n) ticks[index] = (start + index) / step
  }

  if (reverse) ticks.reverse()

  return ticks
}

const tickIncrement = (start: number, stop: number, count: number) => {
  var step = (stop - start) / Math.max(0, count),
    power = Math.floor(Math.log(step) / Math.LN10),
    error = step / Math.pow(10, power)
  return power >= 0
    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) *
        Math.pow(10, power)
    : -Math.pow(10, -power) /
        (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1)
}

export default getD3Ticks
