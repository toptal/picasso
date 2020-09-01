import { rem, remToNumber } from './'

describe('Px to rem units converter', () => {
  it('should convert 0px to rem', () => {
    const remResult = rem('0px')

    expect(remResult).toBe('0rem')
  })

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

  it('should convert 0.5px to rem', () => {
    const remResult = rem('0.5px')

    expect(remResult).toBe('0.03125rem')
  })

  it('should convert 12px to rem with 20px base font size', () => {
    const remResult = rem('12px', 20)

    expect(remResult).toBe('0.6rem')
  })
})

describe('Rem units to number converter', () => {
  it('should convert 0.6875rem to number', () => {
    const remResult = remToNumber('0.6875rem')

    expect(remResult).toBe(0.6875)
  })

  it('should convert 0rem to number', () => {
    const remResult = remToNumber('0rem')

    expect(remResult).toBe(0)
  })
})
