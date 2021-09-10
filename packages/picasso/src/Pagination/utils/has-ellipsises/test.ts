import hasEllipses from './has-ellipsises'

describe('hasEllipses', () => {
  it('works correctly', () => {
    expect(
      hasEllipses({ activePage: 1, totalPages: 5, siblingCount: 1 })
    ).toEqual([false, true])

    expect(
      hasEllipses({ activePage: 24, totalPages: 52, siblingCount: 2 })
    ).toEqual([true, true])

    expect(
      hasEllipses({ activePage: 2, totalPages: 3, siblingCount: 1 })
    ).toEqual([false, false])
  })
})
