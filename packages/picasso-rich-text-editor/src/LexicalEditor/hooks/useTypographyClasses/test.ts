import { renderHook } from '@testing-library/react-hooks'
import { getTypographyClassName } from '@toptal/picasso'
import type { TypographyOptions } from '@toptal/picasso'

import useTypographyClasses from './useTypographyClasses'

jest.mock('@toptal/picasso', () => ({
  __esModule: true,
  typographyStyles: { root: 'TEST_CLASS_NAME' },
  getTypographyClassName: jest.fn(() => 'TEST_CLASS_NAME'),
}))

jest.mock('@material-ui/core/styles', () => ({
  makeStyles: jest.fn(() => () => ({ root: 'TEST_CLASS_NAME+1' })),
}))

jest.mock('@toptal/picasso', () => ({
  __esModule: true,
  typographyStyles: { root: 'TEST_CLASS_NAME' },
  getTypographyClassName: jest.fn(() => 'TEST_CLASS_NAME'),
}))

const mockedGetTypographyClassName =
  getTypographyClassName as jest.MockedFunction<typeof getTypographyClassName>

describe('useTypographyClasses', () => {
  beforeEach(() => {
    mockedGetTypographyClassName.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when useTypographyClasses is called', () => {
    it('calls getTypographyClassName with the correct parameters', () => {
      const options: TypographyOptions = { variant: 'body', size: 'medium' }

      renderHook(() => useTypographyClasses(options))

      expect(getTypographyClassName).toHaveBeenCalledWith(
        { root: 'TEST_CLASS_NAME+1' },
        options
      )
    })

    it('returns the value from getTypographyClassName', () => {
      const returnValue = 'test-class-name'

      mockedGetTypographyClassName.mockReturnValue(returnValue)

      const { result } = renderHook(() =>
        useTypographyClasses({ variant: 'body', size: 'medium' })
      )

      expect(result.current).toBe(returnValue)
    })
  })
})
