import React, { forwardRef, useContext } from 'react'
import { OverridableComponent } from '@toptal/picasso-shared'

import FlatMenuItem, { FlatMenuItemProps } from '../FlatMenuItem'
import MenuContext from '../Menu/MenuContext'

export type Props = FlatMenuItemProps

export const MenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function MenuItem (props, ref) {
  const { drilldown } = useContext(MenuContext)

  return !drilldown ? <FlatMenuItem ref={ref} {...props} /> : undefined
})

MenuItem.defaultProps = {
  as: 'li',
  variant: 'light',
  nonSelectable: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
