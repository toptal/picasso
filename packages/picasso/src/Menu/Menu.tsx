import React, { forwardRef } from 'react'
import {
  CompoundedComponentWithRef,
  PicassoComponentWithRef
} from '@toptal/picasso-shared'

import StackMenu, { StackMenuProps } from '../StackMenu'
import MenuItem from '../MenuItem'

export type Props = StackMenuProps

export interface StaticProps {
  Item: typeof MenuItem
}

export const Menu = forwardRef<HTMLUListElement, Props>(function Menu (
  props,
  ref
) {
  return <StackMenu ref={ref} {...props} />
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
