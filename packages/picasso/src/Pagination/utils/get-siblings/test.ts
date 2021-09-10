import getSiblings from './get-siblings'

describe('getSiblings', () => {
  it('gets first-level siblings', () => {
    expect(
      getSiblings({ activePage: 1, totalPages: 5, siblingCount: 1 })
    ).toEqual([[], [2]])

    expect(
      getSiblings({ activePage: 1, totalPages: 2, siblingCount: 1 })
    ).toEqual([[], []])

    expect(
      getSiblings({ activePage: 5, totalPages: 10, siblingCount: 1 })
    ).toEqual([[4], [6]])
  })

  it('gets second-level siblings', () => {
    expect(
      getSiblings({ activePage: 1, totalPages: 5, siblingCount: 2 })
    ).toEqual([[], [2, 3]])

    expect(
      getSiblings({ activePage: 24, totalPages: 52, siblingCount: 2 })
    ).toEqual([
      [22, 23],
      [25, 26]
    ])

    expect(
      getSiblings({ activePage: 5, totalPages: 10, siblingCount: 2 })
    ).toEqual([
      [3, 4],
      [6, 7]
    ])
  })
})
