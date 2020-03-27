import toRechartsHighlightFormat from './'

const TOP_DOMAIN = 2

const HIGHLIGHT_DATA = [
  {
    from: 6,
    to: 8,
    color: 'green'
  }
]

const CONVERTED_DATA = [
  [
    {
      fill: 'green',
      fillOpacity: 0.1,
      x1: 6,
      x2: 8,
      y1: 0,
      y2: 2
    },
    {
      fill: 'green',
      fillOpacity: 0.1,
      x1: 6,
      x2: 8,
      y1: 1.9,
      y2: 2
    }
  ]
]

test('get chart ticks', () => {
  const chartTicks = toRechartsHighlightFormat(TOP_DOMAIN, HIGHLIGHT_DATA)
  expect(chartTicks).toEqual(CONVERTED_DATA)
})
