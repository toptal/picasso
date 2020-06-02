import capitalize from './capitalize'

describe('capitalize()', () => {
  test('should capitalize first string character', () => {
    expect(capitalize('test')).toEqual('Test')
    expect(capitalize('')).toEqual('')
    expect(capitalize(' whitespace')).toEqual(' whitespace')
  })
})
