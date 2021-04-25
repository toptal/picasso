import { renderHook } from '@testing-library/react-hooks'

import useMenu from './use-menu'
import useMenuMode from '../use-menu-mode'
import useSliderMenu from '../use-slider-menu'
import useDrilldownMenu from '../use-drilldown-menu'

jest.mock('../use-menu-mode')
jest.mock('../use-slider-menu')
jest.mock('../use-drilldown-menu')

const mockedUseMenuMode = useMenuMode as jest.MockedFunction<typeof useMenuMode>
const mockedUseSliderMenu = useSliderMenu as jest.MockedFunction<
  typeof useSliderMenu
>
const mockedUseDrilldownMenu = useDrilldownMenu as jest.MockedFunction<
  typeof useDrilldownMenu
>

describe('useMenu', () => {
  beforeEach(() => {
    mockedUseSliderMenu.mockReturnValue({
      context: {
        mode: 'slider'
      },
      innerMenu: undefined,
      hasBackButton: true
    })

    mockedUseDrilldownMenu.mockReturnValue({
      context: {
        mode: 'drilldown'
      },
      innerMenu: undefined,
      hasBackButton: false
    })
  })

  it('uses slider if mode is slider', () => {
    const mode = 'slider'

    mockedUseMenuMode.mockReturnValue(mode)
    const { result } = renderHook(() => useMenu({ mode }))

    expect(result.current.context.mode).toBe(mode)
  })

  it('uses drilldown if mode is drilldown', () => {
    const mode = 'drilldown'

    mockedUseMenuMode.mockReturnValue(mode)
    const { result } = renderHook(() => useMenu({ mode }))

    expect(result.current.context.mode).toBe(mode)
  })
})
