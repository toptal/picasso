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
  describe('when opacity is out of range', () => {
    it('should throw an error', () => {
      expect(() => hexToRgba('#000', -1)).toThrow()
      expect(() => hexToRgba('#000', 1.1)).toThrow()
    })
  })

  describe('when hex code is invalid', () => {
    it('should throw an error', () => {
      expect(() => hexToRgba('#00', 1)).toThrow()
      expect(() => hexToRgba('000', 1)).toThrow()
      expect(() => hexToRgba('000000', 1)).toThrow()
      expect(() => hexToRgba('#0000000', 1)).toThrow()
      expect(() => hexToRgba('#u00000', 1)).toThrow()
    })
  })

  describe('when shorthand hex code is used', () => {
    it('should convert #0F0 to rgba(0, 255, 0, 1)', () => {
      expect(hexToRgba('#0F0', 1)).toBe('rgba(0, 255, 0, 1)')
    })
  })

  describe('when opacity is 0.75 and hex is #00FF00', () => {
    it('should convert to rgba(0, 255, 0, 0.75)', () => {
      expect(hexToRgba('#00FF00', 0.75)).toBe('rgba(0, 255, 0, 0.75)')
    })
  })
})
