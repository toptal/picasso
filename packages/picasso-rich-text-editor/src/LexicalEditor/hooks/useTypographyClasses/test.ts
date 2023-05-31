import { renderHook } from '@testing-library/react-hooks'

import useTypographyClasses from './useTypographyClasses'
import getTypographyClassName from '../../../Typography/utils/get-typography-class-name/get-typography-class-name'
import type { TypographyOptions } from '../../../Typography/utils/get-typography-class-name/get-typography-class-name'

jest.mock('../../../Typography/styles', () => ({
  __esModule: true,
  default: { root: 'TEST_CLASS_NAME' },
}))

jest.mock('@material-ui/core/styles', () => ({
  makeStyles: jest.fn(() => () => ({ root: 'TEST_CLASS_NAME+1' })),
}))

jest.mock(
  '../../../Typography/utils/get-typography-class-name/get-typography-class-name'
)

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
