import findTopDomain from '.'

const CHART_DATA_UP_TO_10 = [
  { test1: 5, test2: 3 },
  { test1: 4, test2: 5 },
  { test1: 7, test2: 1 },
  { test1: 9, test2: 2 }
]

const CHART_DATA_UP_TO_100 = [
  { test1: 50, test2: 30 },
  { test1: 40, test2: 5 },
  { test1: 7, test2: 1 },
  { test1: 99, test2: 2 }
]

const CHART_DATA_UP_TO_1000 = [
  { test1: 50, test2: 30 },
  { test1: 40, test2: 5 },
  { test1: 7, test2: 1 },
  { test1: 1000, test2: 2 }
]

describe('findTopDomain', () => {
  it('finds top domain', () => {
    expect(findTopDomain(CHART_DATA_UP_TO_10)).toEqual(10)
    expect(findTopDomain(CHART_DATA_UP_TO_100)).toEqual(100)
    expect(findTopDomain(CHART_DATA_UP_TO_1000)).toEqual(1000)
  })
})
