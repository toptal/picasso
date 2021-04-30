import { act, renderHook } from '@testing-library/react-hooks'
import React, { FC } from 'react'

import MenuContext, { MenuContextProps } from '../../../Menu/MenuContext'
import useSlideMenuItem, { Props } from './use-slide-menu-item'

const renderUseSlideMenuItem = (
  props: Props,
  contextProps: MenuContextProps
) => {
  const wrapper: FC = ({ children }) => (
    <MenuContext.Provider value={contextProps}>{children}</MenuContext.Provider>
  )

  return renderHook(() => useSlideMenuItem(props), { wrapper })
}

describe('useSlideMenuItem', () => {
  it('updates menu when renders', () => {
    const key = '1'
    const menu = <div />
    const onItemUpdate = jest.fn()

    renderUseSlideMenuItem({ key, menu }, { onItemUpdate })

    expect(onItemUpdate).toHaveBeenCalledWith(key, menu)
    expect(onItemUpdate).toHaveBeenCalledTimes(1)
  })

  it('delegates events to context', () => {
    const key = '1'
    const menu = <div />
    const event = new MouseEvent('click') as any
    const onItemClick = jest.fn()
    const onStopPropagation = jest.spyOn(event, 'stopPropagation')

    const { result } = renderUseSlideMenuItem({ key, menu }, { onItemClick })

    act(() => result.current.onItemClick(event))
    expect(onItemClick).toHaveBeenCalledTimes(1)
    expect(onStopPropagation).toHaveBeenCalledTimes(1)
  })
})
