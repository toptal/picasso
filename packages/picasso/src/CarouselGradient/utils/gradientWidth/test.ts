import gradientWidth from './gradientWidth'

describe('gradientWidth', () => {
  it('returns 0 when slidesToShow is an integer', () => {
    const result = gradientWidth(2)

    expect(result).toBe(0)
  })

  it('returns the correct gradient width when slidesToShow is not an integer', () => {
    const result = gradientWidth(2.5)

    expect(result).toBe(20)
  })

  it('returns 0 when slidesToShow is 0', () => {
    const result = gradientWidth(0)

    expect(result).toBe(0)
  })

  it('returns 0 when slidesToShow is negative', () => {
    const result = gradientWidth(-2)

    expect(result).toBe(0)
  })
})
