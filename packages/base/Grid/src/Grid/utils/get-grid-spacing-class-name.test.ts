import { getGridSpacingClassName } from './get-grid-spacing-class-name'

describe('getGridSpacingClassName', () => {
  it('returns the correct class name for each valid grid spacing', () => {
    const testCases = {
      '0': 'width-calc-100pct-0px -m-[0px]',
      '8': 'width-calc-100pct-8px -m-[4px]',
      '16': 'width-calc-100pct-16px -m-[8px]',
      '24': 'width-calc-100pct-24px -m-[12px]',
      '32': 'width-calc-100pct-32px -m-[16px]',
      '64': 'width-calc-100pct-64px -m-[32px]',
      '72': 'width-calc-100pct-72px -m-[36px]',
      '80': 'width-calc-100pct-80px -m-[40px]',
    }

    Object.entries(testCases).forEach(([spacing, expectedClassName]) => {
      const result = getGridSpacingClassName(spacing)

      expect(result).toEqual(expectedClassName)
    })
  })

  it('returns an empty string when the spacing value is not defined', () => {
    const result = getGridSpacingClassName(undefined)

    expect(result).toBe('')
  })

  it('returns an empty string when the spacing value is invalid', () => {
    const result = getGridSpacingClassName('invalid-spacing' as any)

    expect(result).toBe('')
  })
})
