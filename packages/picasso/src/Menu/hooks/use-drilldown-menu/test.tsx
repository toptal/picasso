import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import useDrilldownMenu from './use-drilldown-menu'

describe('useDrilldownMenu', () => {
  it('renders initially', () => {
    const { result } = renderHook(() => useDrilldownMenu())

    expect(result.current.context.mode).toBe('drilldown')
    expect(result.current.context.activeItemKey).toBeUndefined()
    expect(result.current.innerMenu).toBeUndefined()
    expect(result.current.hasBackButton).toBeFalsy()
  })

  it('navigates between items', () => {
    const menu = <div />
    const { result } = renderHook(() => useDrilldownMenu())

    act(() => result.current.context.onItemMouseEnter?.('1', menu))
    expect(result.current.context.activeItemKey).toBe('1')

    act(() => result.current.context.onMenuMouseLeave?.())
    expect(result.current.context.activeItemKey).toBeUndefined()
  })

  it('closes submenu on away click', () => {
    const menu = <div />
    const { result } = renderHook(() => useDrilldownMenu())

    act(() => result.current.context.onItemMouseEnter?.('1', menu))
    expect(result.current.context.activeItemKey).toBe('1')

    act(() => result.current.context.onAwayClick?.())
    expect(result.current.context.activeItemKey).toBeUndefined()
  })
})
