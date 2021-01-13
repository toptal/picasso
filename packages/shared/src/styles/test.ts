import { px, rem, stringToNumber } from './'

describe('String to number converter', () => {
  it('converts 0.6875rem to number', () => {
    expect(stringToNumber('0.6875rem')).toBe(0.6875)
  })

  it('converts 0rem to number', () => {
    expect(stringToNumber('0rem')).toBe(0)
  })
})

describe('Px to rem units converter', () => {
  it('converts 0px to rem', () => {
    expect(rem('0px')).toBe('0rem')
  })

  it('converts 11px to rem', () => {
    expect(rem('11px')).toBe('0.6875rem')
  })

  it('converts 13px to rem', () => {
    expect(rem('13px')).toBe('0.8125rem')
  })

  it('converts 16px to rem', () => {
    expect(rem('16px')).toBe('1rem')
  })

  it('converts 0.5px to rem', () => {
    expect(rem('0.5px')).toBe('0.03125rem')
  })

  it('converts 12px to rem with 20px base font size', () => {
    expect(rem('12px', 20)).toBe('0.6rem')
  })
})

describe('rem to px units converter', () => {
  it('converts 0rem to px', () => {
    expect(px('0rem')).toBe('0px')
  })

  it('converts 0.6875rem to px', () => {
    expect(px('0.6875rem')).toBe('11px')
  })

  it('converts 1rem to rem with 20px base font size', () => {
    expect(px('1rem', 20)).toBe('20px')
  })
})
