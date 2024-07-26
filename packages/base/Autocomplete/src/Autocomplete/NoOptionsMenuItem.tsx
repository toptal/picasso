import React from 'react'
import { MenuItem } from '@toptal/picasso-menu'

const NoOptionsMenuItem = ({ children, ...rest }: { children: string }) => (
  <MenuItem titleCase={false} disabled {...rest}>
    {children}
  </MenuItem>
)

NoOptionsMenuItem.displayName = 'NoOptionsMenuItem'

export default NoOptionsMenuItem
