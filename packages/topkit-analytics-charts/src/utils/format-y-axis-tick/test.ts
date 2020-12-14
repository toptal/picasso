import formatYAxisTick from './format-y-axis-tick'

test('format y axis ticks', () => {
  expect(formatYAxisTick(3, [0, 1])).toBe('3')
})

test('format y axis ticks with minutes unit', () => {
  expect(formatYAxisTick(20, [0, 37], 'minutes')).toBe('20m')
  expect(formatYAxisTick(120, [0, 140], 'minutes')).toBe('2h')
  expect(formatYAxisTick(2880, [0, 5444], 'minutes')).toBe('2d')
})
