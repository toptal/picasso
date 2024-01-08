import isEmpty from './is-empty'

describe('isEmpty', () => {
  it('checks correctly', () => {
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(1)).toBeFalsy()
    expect(isEmpty('1')).toBeFalsy()
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty([1, 2, 3])).toBeFalsy()
    expect(isEmpty(['1', '2', '3'])).toBeFalsy()
  })
})
