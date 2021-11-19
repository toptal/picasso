import React, { ReactNode } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import useSlideMenu from './use-slide-menu'
import MenuContext, { MenuContextProps } from '../../MenuContext'

describe('useSlideMenu', () => {
  it('renders initially', () => {
    const { result } = renderHook(() => useSlideMenu())

    expect(result.current.context.variant).toBe('slide')
    expect(result.current.innerMenu).toBeUndefined()
    expect(result.current.hasBackButton).toBeFalsy()
  })

  it('navigates back and forth', () => {
    const menu1 = <div />
    const menu2 = <div />
    const { result } = renderHook(() => useSlideMenu())

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
    const { result } = renderHook(() => useSlideMenu())

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
    const wrapper = ({ children }: { children: ReactNode }) => {
      return (
        <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
      )
    }
    const { result } = renderHook(() => useSlideMenu(), { wrapper })

    act(() => result.current.context.onItemClick?.('1', menu))

    expect(result.current.innerMenu).toBeUndefined()
    expect(result.current.hasBackButton).toBeTruthy()
    expect(context.onItemClick).toHaveBeenCalledWith('1', menu)
  })
})
