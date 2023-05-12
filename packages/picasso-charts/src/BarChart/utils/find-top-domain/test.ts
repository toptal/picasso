import findTopDomain from '.'

const CHART_DATA_UP_TO_10 = [
  { test1: 5, test2: 3 },
  { test1: 4, test2: 5 },
  { test1: 7, test2: 1 },
  { test1: 9, test2: 2 },
]

const CHART_DATA_UP_TO_100 = [
  { test1: 50, test2: 30 },
  { test1: 40, test2: 5 },
  { test1: 7, test2: 1 },
  { test1: 99, test2: 2 },
]

const CHART_DATA_UP_TO_1000 = [
  { test1: 50, test2: 30 },
  { test1: 40, test2: 5 },
  { test1: 7, test2: 1 },
  { test1: 1000, test2: 2 },
]

const STACKED_CHART_DATA_UP_TO_100 = [
  { test1: 50, test2: 30, test3: 12 },
  { test1: 40, test2: 5, test3: 22 },
  { test1: 7, test2: 1, test3: 3 },
  { test1: 95, test2: 2, test3: 5 },
]

const STACKED_CHART_DATA_THAT_ADDS_UP_OVER_100 = [
  { test1: 50, test2: 60, test3: 12 },
  { test1: 40, test2: 5, test3: 22 },
  { test1: 7, test2: 1, test3: 3 },
  { test1: 95, test2: 12, test3: 5 },
]

const STACKED_CHART_DATA_THAT_CAN_ADD_UP_OVER_1000 = [
  { test1: 500, test2: 720, test3: 55 },
  { test1: 320, test2: 420, test3: 11 },
]

describe('findTopDomain', () => {
  describe('when no stacked bars are present', () => {
    it('finds top domain', () => {
      expect(findTopDomain(CHART_DATA_UP_TO_10)).toBe(10)
      expect(findTopDomain(CHART_DATA_UP_TO_100)).toBe(100)
      expect(findTopDomain(CHART_DATA_UP_TO_1000)).toBe(1000)
    })
  })
  describe('when stacked bars are present', () => {
    it('finds top domain accounting for stacked values', () => {
      expect(
        findTopDomain(STACKED_CHART_DATA_UP_TO_100, [['test1', 'test2']])
      ).toBe(100)
      expect(
        findTopDomain(STACKED_CHART_DATA_THAT_ADDS_UP_OVER_100, [
          ['test1', 'test2'],
        ])
      ).toBe(200)

      // Stacking so that the values add up to over 1000
      expect(
        findTopDomain(STACKED_CHART_DATA_THAT_CAN_ADD_UP_OVER_1000, [
          ['test1', 'test2'],
        ])
      ).toBe(2000)

      // Stacking so that the values from the previous test don't add up to over 1000
      expect(
        findTopDomain(STACKED_CHART_DATA_THAT_CAN_ADD_UP_OVER_1000, [
          ['test2', 'test3'],
        ])
      ).toBe(800)
    })
  })
})
