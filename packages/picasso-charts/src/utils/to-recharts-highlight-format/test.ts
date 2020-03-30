import toRechartsHighlightFormat from './'

const TOP_DOMAIN = 2

const HIGHLIGHTS = [
  {
    from: 6,
    to: 8,
    color: 'green'
  }
]

const EXPECTED_DATA = [
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

test('convert to rechart highlight format', () => {
  const highlights = toRechartsHighlightFormat(TOP_DOMAIN, HIGHLIGHTS)
  expect(highlights).toEqual(EXPECTED_DATA)
})
