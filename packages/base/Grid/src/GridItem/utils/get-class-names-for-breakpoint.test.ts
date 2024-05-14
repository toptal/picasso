import { getClassNamesForBreakpoint } from './get-class-names-for-breakpoint'

describe('getClassNamesForBreakpoint', () => {
  it('returns empty array for unsupported size types', () => {
    expect(getClassNamesForBreakpoint('xs', 'unsupported' as any)).toEqual([])
    expect(getClassNamesForBreakpoint('sm', {} as any)).toEqual([])
  })

  it('returns correct classes for size "true"', () => {
    expect(getClassNamesForBreakpoint('xs', true)).toEqual([
      'xs:basis-0',
      'xs:grow',
      'xs:max-w-full',
    ])
    expect(getClassNamesForBreakpoint('lg', true)).toEqual([
      'lg:basis-0',
      'lg:grow',
      'lg:max-w-full',
    ])
  })

  it('returns correct classes for size "auto"', () => {
    expect(getClassNamesForBreakpoint('md', 'auto')).toEqual([
      'md:basis-auto',
      'md:grow-0',
      'md:max-w-none',
    ])
  })

  it('returns correct classes for numeric sizes', () => {
    expect(getClassNamesForBreakpoint('xl', 1)).toEqual([
      'xl:basis-1/12',
      'xl:max-w-1/12',
    ])
    expect(getClassNamesForBreakpoint('sm', 12)).toEqual([
      'sm:basis-full',
      'sm:max-w-full',
    ])
  })
})
