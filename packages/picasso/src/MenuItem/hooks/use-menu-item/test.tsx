import { renderHook } from '@testing-library/react-hooks'

import useMenuItem from './use-menu-item'
import useMenuItemKey from '../use-menu-item-key'
import useSliderMenuItem from '../use-slider-menu-item'
import useDrilldownMenuItem from '../use-drilldown-menu-item'

jest.mock('../use-menu-item-key')
jest.mock('../use-slider-menu-item')
jest.mock('../use-drilldown-menu-item')

const mockedUseMenuItemKey = useMenuItemKey as jest.MockedFunction<
  typeof useMenuItemKey
>
const mockedUseSliderMenuItem = useSliderMenuItem as jest.MockedFunction<
  typeof useSliderMenuItem
>
const mockedUseDrilldownMenuItem = useDrilldownMenuItem as jest.MockedFunction<
  typeof useDrilldownMenuItem
>

describe('useMenuItem', () => {
  it('combines hooks for different menu modes', () => {
    const key = '1'
    const isOpened = false
    const onItemClick = jest.fn()
    const onItemMouseEnter = jest.fn()
    const onAwayClick = jest.fn()

    mockedUseMenuItemKey.mockReturnValue(key)
    mockedUseSliderMenuItem.mockReturnValue({ onItemClick })
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
