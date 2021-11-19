import React, { ReactNode } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useMenuVariant, { Props } from './use-menu-variant'
import MenuContext, { MenuContextProps } from '../../MenuContext'

describe('useMenuVariant', () => {
  it('uses variant from props if there is no context', () => {
    const props: Props = { variant: 'slide' }

    const { result } = renderHook(() => useMenuVariant(props))

    expect(result.current).toBe(props.variant)
  })

  it('uses variant from context if it is provided', () => {
    const props: Props = { variant: 'slide' }
    const context: MenuContextProps = { variant: 'drilldown' }
    const wrapper = ({ children }: { children: ReactNode }) => {
      return (
        <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
      )
    }

    const { result } = renderHook(() => useMenuVariant(props), { wrapper })

    expect(result.current).toBe(context.variant)
  })
})
