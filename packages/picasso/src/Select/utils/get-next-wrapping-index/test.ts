import getNextWrappingIndex from './get-next-wrapping-index'

describe('getNextWrappingIndex', () => {
  it('gets correctly', () => {
    expect(getNextWrappingIndex(2, 0, 3)).toEqual(2)
    expect(getNextWrappingIndex(2, null, 3)).toEqual(1)
    expect(getNextWrappingIndex(3, 1, 2)).toEqual(0)
    expect(getNextWrappingIndex(1, 1, 5)).toEqual(2)
  })
})
