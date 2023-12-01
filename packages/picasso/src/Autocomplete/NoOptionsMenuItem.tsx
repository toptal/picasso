/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { MenuCompound as Menu } from '@toptal/picasso-menu-compound'

const NoOptionsMenuItem = ({ children, ...rest }: { children: string }) => (
  <Menu.Item titleCase={false} disabled {...rest}>
    {children}
  </Menu.Item>
)

NoOptionsMenuItem.displayName = 'NoOptionsMenuItem'

export default NoOptionsMenuItem
