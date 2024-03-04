import React from 'react'
import { MenuCompound as Menu } from '@toptal/picasso-menu'

const NoOptionsMenuItem = ({ children, ...rest }: { children: string }) => (
  <Menu.Item titleCase={false} disabled {...rest}>
    {children}
  </Menu.Item>
)

NoOptionsMenuItem.displayName = 'NoOptionsMenuItem'

export default NoOptionsMenuItem
