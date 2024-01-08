import gradientWidth from './gradient-width'

describe('gradientWidth', () => {
  it('returns the expected gradient width', () => {
    const result = gradientWidth(2.5)
    const result2 = gradientWidth(2.75)
    const result3 = gradientWidth(3.5)

    expect(result).toBe('20%')
    expect(result2).toBe('27%')
    expect(result3).toBe('14%')
  })
})
