import { renderHook } from '@testing-library/react-hooks'

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

    mockedUseMenuItemKey.mockReturnValue(key)
    mockedUseSlideMenuItem.mockReturnValue({ onItemClick })
    mockedUseDrilldownMenuItem.mockReturnValue({
      isOpened,
      onItemMouseEnter,
      onAwayClick
    })

    const { result } = renderHook(() => useMenuItem({}))

    expect(result.current).toEqual({
      isOpened,
      onItemClick,
      onItemMouseEnter,
      onAwayClick
    })
  })
})
