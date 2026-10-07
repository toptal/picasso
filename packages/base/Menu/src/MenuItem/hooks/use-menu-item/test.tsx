import { act, renderHook } from '@testing-library/react-hooks'

import useMenuItem from './use-menu-item'
import useMenuItemKey from '../use-menu-item-key'
import useSlideMenuItem from '../use-slide-menu-item'
import useDrilldownMenuItem from '../use-drilldown-menu-item'

jest.mock('../use-menu-item-key')
jest.mock('../use-slide-menu-item')
jest.mock('../use-drilldown-menu-item')

const mockedUseMenuItemKey = useMenuItemKey as jest.MockedFunction<
  typeof useMenuItemKey
>
const mockedUseSlideMenuItem = useSlideMenuItem as jest.MockedFunction<
  typeof useSlideMenuItem
>
const mockedUseDrilldownMenuItem = useDrilldownMenuItem as jest.MockedFunction<
  typeof useDrilldownMenuItem
>

describe('useMenuItem', () => {
  it('combines hooks for different menu variants', () => {
    const key = '1'
    const isOpened = false
    const onItemClick = jest.fn()
    const onItemMouseEnter = jest.fn()
    const onAwayClick = jest.fn()
    const closeMenu = jest.fn()

    mockedUseMenuItemKey.mockReturnValue(key)
    mockedUseSlideMenuItem.mockReturnValue({
      onItemClick,
      openSlideMenuWithKeyboard: jest.fn(),
    })
    mockedUseDrilldownMenuItem.mockReturnValue({
      isOpened,
      isOpenedWithKeyboard: false,
      onItemMouseEnter,
      onAwayClick,
      openDrilldownMenuWithKeyboard: jest.fn(),
      closeMenu,
    })

    const { result } = renderHook(() => useMenuItem({}))

    expect(result.current).toEqual({
      isOpened,
      isOpenedWithKeyboard: false,
      onItemClick,
      onItemMouseEnter,
      onAwayClick,
      closeMenu,
      openMenuWithKeyboard: expect.any(Function),
    })
  })

  it('opens the submenu of whichever variant is active with the keyboard', () => {
    const openSlideMenuWithKeyboard = jest.fn()
    const openDrilldownMenuWithKeyboard = jest.fn()

    mockedUseMenuItemKey.mockReturnValue('1')
    mockedUseSlideMenuItem.mockReturnValue({
      onItemClick: jest.fn(),
      openSlideMenuWithKeyboard,
    })
    mockedUseDrilldownMenuItem.mockReturnValue({
      isOpened: false,
      isOpenedWithKeyboard: false,
      onItemMouseEnter: jest.fn(),
      onAwayClick: jest.fn(),
      openDrilldownMenuWithKeyboard,
      closeMenu: jest.fn(),
    })

    const { result } = renderHook(() => useMenuItem({}))

    act(() => result.current.openMenuWithKeyboard())

    expect(openSlideMenuWithKeyboard).toHaveBeenCalledTimes(1)
    expect(openDrilldownMenuWithKeyboard).toHaveBeenCalledTimes(1)
  })
})
