import { getSizesClassNames } from './get-sizes-class-names'
import { getClassNamesForBreakpoint } from './get-class-names-for-breakpoint'

// Mocking the imported function
jest.mock('./get-class-names-for-breakpoint', () => ({
  getClassNamesForBreakpoint: jest.fn(),
}))

describe('getSizesClassNames', () => {
  // Reset mock before each test
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls getClassNamesForBreakpoint with correct parameters for all breakpoints', () => {
    const mockSizes = {
      xs: 'auto',
      sm: true,
      md: 3,
      lg: null,
      xl: '12/12',
    }

    // Mock implementation to return an array containing the breakpoint key and size
    getClassNamesForBreakpoint.mockImplementation((breakpoint, size) => [
      `${breakpoint}: ${size}`,
    ])

    const result = getSizesClassNames(mockSizes)

    expect(getClassNamesForBreakpoint).toHaveBeenCalledTimes(5)
    expect(getClassNamesForBreakpoint).toHaveBeenNthCalledWith(1, 'xs', 'auto')
    expect(getClassNamesForBreakpoint).toHaveBeenNthCalledWith(2, 'sm', true)
    expect(getClassNamesForBreakpoint).toHaveBeenNthCalledWith(3, 'md', 3)
    expect(getClassNamesForBreakpoint).toHaveBeenNthCalledWith(4, 'lg', null)
    expect(getClassNamesForBreakpoint).toHaveBeenNthCalledWith(5, 'xl', '12/12')
    expect(result).toEqual([
      ['xs: auto'],
      ['sm: true'],
      ['md: 3'],
      ['lg: null'],
      ['xl: 12/12'],
    ])
  })

  it('handles undefined sizes correctly', () => {
    const mockSizes = {
      xs: undefined,
      sm: undefined,
      md: undefined,
      lg: undefined,
      xl: undefined,
    }

    getClassNamesForBreakpoint.mockReturnValue([])

    const result = getSizesClassNames(mockSizes)

    expect(getClassNamesForBreakpoint).toHaveBeenCalledTimes(5)
    expect(result.every(classNames => classNames.length === 0)).toBe(true)
  })
})
