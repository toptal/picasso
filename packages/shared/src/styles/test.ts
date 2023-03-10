import { hexToRgba, pxFromRem, rem } from './'

describe('Px to rem units converter using the BASE font size by default', () => {
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

  it('supports formatting with a custom font size', () => {
    expect(rem('12px', 20)).toBe('0.6rem')
  })
})

describe('rem to px units converter using the BASE font size by default', () => {
  it('converts 0rem to px', () => {
    expect(pxFromRem('0rem')).toBe('0px')
  })

  it('converts 0.6875rem to px', () => {
    expect(pxFromRem('0.6875rem')).toBe('11px')
  })

  it('supports formatting with a custom font size', () => {
    expect(pxFromRem('1rem', 20)).toBe('20px')
  })
})

describe('hexToRgba', () => {
  it('should convert #000 with opacity 1 to rgba(0, 0, 0, 1)', () => {
    expect(hexToRgba('#000', 1)).toBe('rgba(0, 0, 0, 1)')
  })

  it('should convert #FFF with opacity 0.5 to rgba(255, 255, 255, 0.5)', () => {
    expect(hexToRgba('#FFF', 0.5)).toBe('rgba(255, 255, 255, 0.5)')
  })

  it('should convert #FF0000 with opacity 0.25 to rgba(255, 0, 0, 0.25)', () => {
    expect(hexToRgba('#FF0000', 0.25)).toBe('rgba(255, 0, 0, 0.25)')
  })

  it('should convert #00FF00 with opacity 0.75 to rgba(0, 255, 0, 0.75)', () => {
    expect(hexToRgba('#00FF00', 0.75)).toBe('rgba(0, 255, 0, 0.75)')
  })

  it('should convert #0000FF with opacity 0.4 to rgba(0, 0, 255, 0.4)', () => {
    expect(hexToRgba('#0000FF', 0.4)).toBe('rgba(0, 0, 255, 0.4)')
  })
})
