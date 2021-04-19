import { OverridableComponent } from '@toptal/picasso-shared'
import React, { forwardRef } from 'react'

import StackMenuItem, { StackMenuItemProps } from '../StackMenuItem'

export type Props = StackMenuItemProps

export const MenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function MenuItem (props, ref) {
  return <StackMenuItem ref={ref} {...props} />
})

MenuItem.defaultProps = {
  as: 'li',
  variant: 'light',
  nonSelectable: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
