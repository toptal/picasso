import React, { forwardRef, useContext, useMemo } from 'react'
import {
  CompoundedComponentWithRef,
  PicassoComponentWithRef
} from '@toptal/picasso-shared'

import FlatMenu, { FlatMenuProps } from '../FlatMenu'
import MenuItem from '../MenuItem'
import MenuContext from './MenuContext'

export type ModeType = 'flat'

export interface Props extends FlatMenuProps {
  mode?: ModeType
}

export interface StaticProps {
  Item: typeof MenuItem
}

export const Menu = forwardRef<HTMLUListElement, Props>(function Menu (
  props,
  ref
) {
  const { mode = props.mode } = useContext(MenuContext)
  const contextValue = useMemo(() => ({ mode }), [mode])

  return (
    <MenuContext.Provider value={contextValue}>
      {mode === 'flat' ? <FlatMenu ref={ref} {...props} /> : undefined}
    </MenuContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

Menu.defaultProps = {
  mode: 'flat',
  allowNestedNavigation: true
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu as PicassoComponentWithRef<
  Props,
  HTMLUListElement,
  StaticProps
>
