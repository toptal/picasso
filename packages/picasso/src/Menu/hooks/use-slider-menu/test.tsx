import React, { FC } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import useSliderMenu from './use-slider-menu'
import MenuContext, { MenuContextProps } from '../../MenuContext'

describe('useSliderMenu', () => {
  it('renders initially', () => {
    const { result } = renderHook(() => useSliderMenu())

    expect(result.current.context.mode).toBe('slider')
    expect(result.current.innerMenu).toBeUndefined()
    expect(result.current.hasBackButton).toBeFalsy()
  })

  it('navigates back and forth', () => {
    const menu1 = <div />
    const menu2 = <div />
    const { result } = renderHook(() => useSliderMenu())

    act(() => result.current.context.onItemClick?.('1', menu1))
    expect(result.current.innerMenu).toBe(menu1)

    act(() => result.current.context.onItemClick?.('2', menu2))
    expect(result.current.innerMenu).toBe(menu2)

    act(() => result.current.context.onBackClick?.())
    expect(result.current.innerMenu).toBe(menu1)

    act(() => result.current.context.onBackClick?.())
    expect(result.current.innerMenu).toBeUndefined()
  })

  it('updates inner menu when it changes', () => {
    const menu1 = <div />
    const menu2 = <div />
    const { result } = renderHook(() => useSliderMenu())

    act(() => result.current.context.onItemClick?.('1', menu1))
    act(() => result.current.context.onItemUpdate?.('1', menu2))

    expect(result.current.innerMenu).toBe(menu2)
  })

  it('delegates to parent context if available', () => {
    const menu = <div />
    const context: MenuContextProps = {
      onItemClick: jest.fn(),
      onBackClick: jest.fn()
    }
    const wrapper: FC = ({ children }) => (
      <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
    )
    const { result } = renderHook(() => useSliderMenu(), { wrapper })

    act(() => result.current.context.onItemClick?.('1', menu))

    expect(result.current.innerMenu).toBeUndefined()
    expect(result.current.hasBackButton).toBeTruthy()
    expect(context.onItemClick).toHaveBeenCalledWith('1', menu)
  })
})
