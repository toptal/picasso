import { act, renderHook } from '@testing-library/react-hooks'
import type { ReactNode } from 'react'
import React from 'react'

import type { MenuContextProps } from '../../../Menu/MenuContext'
import MenuContext from '../../../Menu/MenuContext'
import type { Props } from './use-drilldown-menu-item'
import useDrilldownMenuItem from './use-drilldown-menu-item'

const renderUseDrilldownMenuItem = (
  props: Props,
  contextProps: MenuContextProps
) => {
  const wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <MenuContext.Provider value={contextProps}>
        {children}
      </MenuContext.Provider>
    )
  }

  return renderHook(() => useDrilldownMenuItem(props), { wrapper })
}

describe('useDrilldownMenuItem', () => {
  it('is opened when active', () => {
    const menu = <div />

    const { result } = renderUseDrilldownMenuItem(
      { key: '1', menu },
      { activeItemKey: '1' }
    )

    expect(result.current.isOpened).toBeTruthy()
  })

  it('is not opened when not active', () => {
    const menu = <div />

    const { result } = renderUseDrilldownMenuItem(
      { key: '1', menu },
      { activeItemKey: '2' }
    )

    expect(result.current.isOpened).toBeFalsy()
  })

  it('delegates events to context', () => {
    const menu = <div />
    const onAwayClick = jest.fn()

    const { result } = renderUseDrilldownMenuItem(
      { key: '1', menu },
      { onAwayClick }
    )

    act(() => result.current.onAwayClick())
    expect(onAwayClick).toHaveBeenCalledTimes(1)
  })
})
