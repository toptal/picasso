import React, { FC } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useMenuMode, { Props } from './use-menu-mode'
import MenuContext, { MenuContextProps } from '../../MenuContext'

describe('useMenuMode', () => {
  it('uses mode from props if there is no context', () => {
    const props: Props = { mode: 'slider' }

    const { result } = renderHook(() => useMenuMode(props))

    expect(result.current).toBe(props.mode)
  })

  it('uses mode from context if it is provided', () => {
    const props: Props = { mode: 'slider' }
    const context: MenuContextProps = { mode: 'drilldown' }
    const wrapper: FC = ({ children }) => (
      <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
    )

    const { result } = renderHook(() => useMenuMode(props), { wrapper })

    expect(result.current).toBe(context.mode)
  })
})
