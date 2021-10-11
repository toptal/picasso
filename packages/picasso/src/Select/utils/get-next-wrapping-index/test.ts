import getNextWrappingIndex from './get-next-wrapping-index'

describe('getNextWrappingIndex', () => {
  it('gets correctly', () => {
    expect(getNextWrappingIndex(2, 0, [])).toEqual(2)
    expect(getNextWrappingIndex(2, null, [])).toEqual(1)
    expect(getNextWrappingIndex(3, 1, [])).toEqual(0)
    expect(getNextWrappingIndex(1, 1, [])).toEqual(2)
  })
})
