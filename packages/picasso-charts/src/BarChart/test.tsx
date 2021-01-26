import { palette } from '@toptal/picasso/utils'

import { getFillColor, formatData, extractValues } from './BarChart'

const TEST_DATA = [
  { name: 'Moscow', value: { infected: 1, recovered: 2 } },
  { name: 'Berlin', value: { infected: 2, recovered: 5 } },
  { name: 'London', value: { infected: 7, recovered: 8 } }
]

describe('BarChart', () => {
  it('gets fill color correctly', () => {
    expect(getFillColor('blue', 0)).toEqual(palette.blue.main)
    expect(getFillColor('blue', 1)).toEqual(palette.blue.main)

    expect(getFillColor('dark-grey', 0)).toEqual(palette.grey.dark)
    expect(getFillColor('dark-grey', 1)).toEqual(palette.grey.dark)

    expect(getFillColor(undefined, 0)).toEqual(palette.blue.main)
    expect(getFillColor(undefined, 1)).toEqual(palette.grey.dark)
    expect(getFillColor(undefined, 2)).toEqual(palette.blue.main)
    expect(getFillColor(undefined, 3)).toEqual(palette.grey.dark)
  })

  it('formats data correctly', () => {
    const expectedData = [
      { name: 'Moscow', infected: 1, recovered: 2 },
      { name: 'Berlin', infected: 2, recovered: 5 },
      { name: 'London', infected: 7, recovered: 8 }
    ]

    expect(formatData<'infected' | 'recovered'>(TEST_DATA)).toEqual(
      expectedData
    )
  })

  it('extracts values correctly', () => {
    const expectedData = [
      { infected: 1, recovered: 2 },
      { infected: 2, recovered: 5 },
      { infected: 7, recovered: 8 }
    ]

    expect(extractValues<'infected' | 'recovered'>(TEST_DATA)).toEqual(
      expectedData
    )
  })
})
