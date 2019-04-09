import { getRange, ELLIPSIS } from './range-utils'

describe('getRange({ activePage, totalPages, siblingCount })', () => {
  test('returns proper range 1', () => {
    const range = getRange(5, 10, 2)

    expect(range).toEqual([ELLIPSIS, 3, 4, 5, 6, 7, ELLIPSIS])
  })

  test('returns proper range 2', () => {
    const range = getRange(3, 5, 3)

    expect(range).toEqual([1, 2, 3, 4, 5])
  })

  test('returns proper range 3', () => {
    const range = getRange(1, 1, 3)

    expect(range).toEqual([1])
  })

  test('returns proper range 4', () => {
    const range = getRange(3, 3, 3)

    expect(range).toEqual([1, 2, 3])
  })

  test('returns proper range 5', () => {
    const range = getRange(10, 10, 3)

    expect(range).toEqual([ELLIPSIS, 7, 8, 9, 10])
  })
})
