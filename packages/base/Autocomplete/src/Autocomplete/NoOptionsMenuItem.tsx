import React from 'react'

import { MenuCompound as Menu } from '../MenuCompound'

const NoOptionsMenuItem = ({ children, ...rest }: { children: string }) => (
  <Menu.Item titleCase={false} disabled {...rest}>
    {children}
  </Menu.Item>
)

NoOptionsMenuItem.displayName = 'NoOptionsMenuItem'

export default NoOptionsMenuItem
