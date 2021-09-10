import getRange from './get-range'

describe('getRange', () => {
  it('works correctly', () => {
    expect(
      getRange({ activePage: 1, totalPages: 5, siblingCount: 1 })
    ).toEqual([1, 2, '...', 5])

    expect(
      getRange({ activePage: 24, totalPages: 52, siblingCount: 2 })
    ).toEqual([1, '...', 22, 23, 24, 25, 26, '...', 52])

    expect(
      getRange({ activePage: 1, totalPages: 5, siblingCount: 2 })
    ).toEqual([1, 2, 3, '...', 5])

    expect(getRange({ activePage: 1, totalPages: 0, siblingCount: 1 })).toEqual(
      []
    )

    expect(
      getRange({ activePage: 1, totalPages: 1, siblingCount: 1 })
    ).toEqual([1])
  })
})
