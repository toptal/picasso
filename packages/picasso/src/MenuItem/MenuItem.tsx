import { OverridableComponent } from '@toptal/picasso-shared'
import React, { forwardRef, useContext } from 'react'

import FlatMenuItem, { FlatMenuItemProps } from '../FlatMenuItem'
import MenuContext from '../Menu/MenuContext'

export type Props = FlatMenuItemProps

export const MenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function MenuItem (props, ref) {
  const { mode } = useContext(MenuContext)

  return mode === 'flat' ? <FlatMenuItem ref={ref} {...props} /> : undefined
})

MenuItem.defaultProps = {
  as: 'li',
  variant: 'light',
  nonSelectable: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
