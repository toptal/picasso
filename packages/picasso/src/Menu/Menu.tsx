import React, { forwardRef, useContext } from 'react'
import {
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import FlatMenu, { FlatMenuProps } from '../FlatMenu'
import MenuItem from '../MenuItem'
import MenuContext from './MenuContext'

export interface Props extends FlatMenuProps {
  drilldown?: boolean
}

export interface StaticProps {
  Item: typeof MenuItem
}

export const Menu = forwardRef<HTMLUListElement, Props>(function Menu (
  props,
  ref
) {
  const { drilldown = props.drilldown } = useContext(MenuContext)

  return (
    <MenuContext.Provider value={{ drilldown }}>
      {!drilldown ? <FlatMenu ref={ref} {...props} /> : undefined}
    </MenuContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

Menu.defaultProps = {
  allowNestedNavigation: true
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu as PicassoComponentWithRef<
  Props,
  HTMLUListElement,
  StaticProps
>
