import { rem } from './'

describe('Px to rem units converter', () => {
  it('should convert 11px to rem', () => {
    const remResult = rem('11px')

    expect(remResult).toBe('0.6875rem')
  })

  it('should convert 13px to rem', () => {
    const remResult = rem('13px')

    expect(remResult).toBe('0.8125rem')
  })

  it('should convert 16px to rem', () => {
    const remResult = rem('16px')

    expect(remResult).toBe('1rem')
  })

  it('should convert 12px to rem with 20px base font size', () => {
    const remResult = rem('12px', 20)

    expect(remResult).toBe('0.6rem')
  })
})
