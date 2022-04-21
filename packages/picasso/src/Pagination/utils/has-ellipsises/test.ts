import hasEllipses from './has-ellipsises'

describe('hasEllipses', () => {
  it('has only ellipses on right side when we are on first page', () => {
    expect(
      hasEllipses({ activePage: 1, totalPages: 5, siblingCount: 1 })
    ).toEqual([false, true])
  })

  it('has only ellipses on both sides when we are in middle', () => {
    expect(
      hasEllipses({ activePage: 24, totalPages: 52, siblingCount: 2 })
    ).toEqual([true, true])
  })

  it('has NO ellipses when we have only one sibling', () => {
    expect(
      hasEllipses({ activePage: 2, totalPages: 3, siblingCount: 1 })
    ).toEqual([false, false])
  })

  it('has NO ellipses when ellipses would appear between two consecutive numbers', () => {
    // We want to avoid 1 .. 2 3 4
    expect(
      hasEllipses({ activePage: 4, totalPages: 4, siblingCount: 2 })
    ).toEqual([false, false])

    // We want to avoid 1 2 3 .. 4
    expect(
      hasEllipses({ activePage: 1, totalPages: 4, siblingCount: 2 })
    ).toEqual([false, false])

    // We want to avoid 1 .. 2 3 4 5 6 .. 7
    expect(
      hasEllipses({ activePage: 4, totalPages: 7, siblingCount: 2 })
    ).toEqual([false, false])

    // We want to avoid 1 .. 2 3 4 5 6 .. 8
    expect(
      hasEllipses({ activePage: 4, totalPages: 8, siblingCount: 2 })
    ).toEqual([false, true])

    // We want to check 1 .. 3 4 5 6 7 .. 9
    expect(
      hasEllipses({ activePage: 5, totalPages: 9, siblingCount: 2 })
    ).toEqual([true, true])
  })
})
