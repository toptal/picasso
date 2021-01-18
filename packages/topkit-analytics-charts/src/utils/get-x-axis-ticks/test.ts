import getXAxisTicks from './get-x-axis-ticks'

const ORDERED_DATA = [
  {
    order: 0
  },
  {
    order: 1
  },
  {
    order: 2
  },
  {
    order: 3
  }
]

it('get x axis ticks', () => {
  const EXPECTED_TICKS = [0, 1, 2, 3]

  expect(getXAxisTicks(ORDERED_DATA, 'week')).toEqual(EXPECTED_TICKS)
  expect(getXAxisTicks(ORDERED_DATA)).toEqual(EXPECTED_TICKS)
})

it('get x axis ticks for day granularity', () => {
  const EXPECTED_TICKS = [0, 2]

  expect(getXAxisTicks(ORDERED_DATA, 'day')).toEqual(EXPECTED_TICKS)
})

it('get x axis ticks for hour granularity', () => {
  const EXPECTED_TICKS = [1, 3]

  expect(getXAxisTicks(ORDERED_DATA, 'hour')).toEqual(EXPECTED_TICKS)
})
