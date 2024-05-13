import { capitalizeFirst } from './index'

describe('captializeFirst', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalizeFirst('test')).toBe('Test')
  })

  it('returns an empty string if the input is empty', () => {
    expect(capitalizeFirst('')).toBe('')
  })
})
