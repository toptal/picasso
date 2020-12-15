import getYAxisTicks from './get-y-axis-ticks'

const DOMAIN: [number, number] = [0, 37]

test('get y axis ticks', () => {
  expect(getYAxisTicks(DOMAIN)).toStrictEqual([0, 10, 20, 30])
})

test('get y axis ticks for minutes unit', () => {
  expect(getYAxisTicks(DOMAIN, 'minutes')).toStrictEqual([0, 10, 20, 30])
})

test('get y axis ticks for minutes unit that exceeds 1 hour', () => {
  expect(getYAxisTicks([0, 5444], 'minutes')).toStrictEqual([
    0,
    1440,
    2880,
    4320
  ])
})
