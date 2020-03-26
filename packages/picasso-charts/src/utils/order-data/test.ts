import orderData from './'

const CONVERTED_CHART_DATA = [
  { x: '2020-10-20', test: 1.7 },
  { x: '2020-10-21', test: 2 },
  { x: '2020-10-22', test: 1.7 },
  { x: '2020-10-23', test: 2 }
]

const ORDERED_CHART_DATA = [
  { order: 0, x: '2020-10-20', test: 1.7 },
  { order: 1, x: '2020-10-21', test: 2 },
  { order: 2, x: '2020-10-22', test: 1.7 },
  { order: 3, x: '2020-10-23', test: 2 }
]

test('order chart data', () => {
  const ordered = orderData(CONVERTED_CHART_DATA)
  expect(ordered).toEqual(ORDERED_CHART_DATA)
})
