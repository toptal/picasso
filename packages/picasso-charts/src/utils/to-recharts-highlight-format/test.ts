import toRechartsHighlightFormat from './'

const TOP_DOMAIN = 2
const DATA_POINT_COUNT = 10
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
      x1: 5.5,
      x2: 7.5,
      y1: 0,
      y2: 2
    },
    {
      fill: 'green',
      fillOpacity: 0.1,
      x1: 5.5,
      x2: 7.5,
      y1: 1.96,
      y2: 2
    }
  ]
]

describe('toRechartsHighlightFormat', () => {
  it('converts to rechart highlight format', () => {
    const highlights = toRechartsHighlightFormat(
      TOP_DOMAIN,
      DATA_POINT_COUNT,
      HIGHLIGHTS
    )

    expect(highlights).toEqual(EXPECTED_DATA)
  })
})
