import { OverridableComponent } from '@toptal/picasso-shared'
import React, { forwardRef } from 'react'

import FlatMenuItem, { FlatMenuItemProps } from '../FlatMenuItem'

export type Props = FlatMenuItemProps

export const MenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function MenuItem (props, ref) {
  return <FlatMenuItem ref={ref} {...props} />
})

MenuItem.defaultProps = {
  as: 'li',
  variant: 'light',
  nonSelectable: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
