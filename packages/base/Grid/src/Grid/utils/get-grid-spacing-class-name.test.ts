import { getGridSpacingClassName } from './get-grid-spacing-class-name'

describe('getGridSpacingClassName', () => {
  it('returns the correct class name for each valid grid spacing', () => {
    const testCases = {
      0: 'w-[calc(100%-0px)] -m-[0px]',
      8: 'w-[calc(100%-8px)] -m-[4px]',
      16: 'w-[calc(100%-16px)] -m-[8px]',
      24: 'w-[calc(100%-24px)] -m-[12px]',
      32: 'w-[calc(100%-32px)] -m-[16px]',
      64: 'w-[calc(100%-64px)] -m-[32px]',
      72: 'w-[calc(100%-72px)] -m-[36px]',
      80: 'w-[calc(100%-80px)] -m-[40px]',
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
