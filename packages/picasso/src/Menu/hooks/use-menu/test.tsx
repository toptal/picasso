import { renderHook } from '@testing-library/react-hooks'

import useMenu from './use-menu'
import useMenuVariant from '../use-menu-variant'
import useSlideMenu from '../use-slide-menu'
import useDrilldownMenu from '../use-drilldown-menu'

jest.mock('../use-menu-variant')
jest.mock('../use-slide-menu')
jest.mock('../use-drilldown-menu')

const mockedUseMenuVariant = useMenuVariant as jest.MockedFunction<
  typeof useMenuVariant
>
const mockedUseSlideMenu = useSlideMenu as jest.MockedFunction<
  typeof useSlideMenu
>
const mockedUseDrilldownMenu = useDrilldownMenu as jest.MockedFunction<
  typeof useDrilldownMenu
>

describe('useMenu', () => {
  beforeEach(() => {
    mockedUseSlideMenu.mockReturnValue({
      context: {
        variant: 'slide'
      },
      innerMenu: undefined,
      hasBackButton: true
    })

    mockedUseDrilldownMenu.mockReturnValue({
      context: {
        variant: 'drilldown'
      },
      innerMenu: undefined,
      hasBackButton: false
    })
  })

  it('uses slide if variant is slide', () => {
    const variant = 'slide'

    mockedUseMenuVariant.mockReturnValue(variant)
    const { result } = renderHook(() => useMenu({ variant }))

    expect(result.current.context.variant).toBe(variant)
  })

  it('uses drilldown if variant is drilldown', () => {
    const variant = 'drilldown'

    mockedUseMenuVariant.mockReturnValue(variant)
    const { result } = renderHook(() => useMenu({ variant }))

    expect(result.current.context.variant).toBe(variant)
  })
})
