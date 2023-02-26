import calculateGradientWidth from './calculateGradientWidth'

describe('calculateGradientWidth', () => {
  it('returns 0 when slidesToShow is an integer', () => {
    const result = calculateGradientWidth(2)

    expect(result).toBe(0)
  })

  it('returns the correct gradient width when slidesToShow is not an integer', () => {
    const result = calculateGradientWidth(2.5)

    expect(result).toBe(20)
  })

  it('returns 0 when slidesToShow is 0', () => {
    const result = calculateGradientWidth(0)

    expect(result).toBe(0)
  })

  it('returns 0 when slidesToShow is negative', () => {
    const result = calculateGradientWidth(-2)

    expect(result).toBe(0)
  })
})
