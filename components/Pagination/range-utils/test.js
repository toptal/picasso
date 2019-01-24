import { getRange, MORE } from './range-utils'

describe.only('getRange({ activePage, totalPages, siblingCount })', () => {
  test('returns proper range 1', () => {
    const range = getRange({
      activePage: 5,
      totalPages: 10,
      siblingCount: 2
    })

    expect(range).toEqual([MORE, 3, 4, 5, 6, 7, MORE])
  })

  test('returns proper range 2', () => {
    const range = getRange({
      activePage: 3,
      totalPages: 5,
      siblingCount: 3
    })

    expect(range).toEqual([1, 2, 3, 4, 5])
  })

  test('returns proper range 3', () => {
    const range = getRange({
      activePage: 1,
      totalPages: 1,
      siblingCount: 3
    })

    expect(range).toEqual([1])
  })

  test('returns proper range 4', () => {
    const range = getRange({
      activePage: 3,
      totalPages: 3,
      siblingCount: 3
    })

    expect(range).toEqual([1, 2, 3])
  })

  test('returns proper range 5', () => {
    const range = getRange({
      activePage: 10,
      totalPages: 10,
      siblingCount: 3
    })

    expect(range).toEqual([MORE, 7, 8, 9, 10])
  })
})
