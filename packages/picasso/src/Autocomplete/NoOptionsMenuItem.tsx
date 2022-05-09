import React from 'react'

import Menu from '../Menu'

const NoOptionsMenuItem = ({ children, ...rest }: { children: string }) => (
  <Menu.Item titleCase={false} disabled {...rest}>
    {children}
  </Menu.Item>
)

NoOptionsMenuItem.displayName = 'NoOptionsMenuItem'

export default NoOptionsMenuItem
