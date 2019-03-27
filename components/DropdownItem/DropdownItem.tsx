import React from 'react'

import MenuItem, { Props } from '../MenuItem/MenuItem'

export const DropdownItem: React.FunctionComponent<Props> = ({
  children,
  ...menuItemProps
}) => {
  return <MenuItem {...menuItemProps}>{children}</MenuItem>
}

DropdownItem.displayName = 'DropdownItem'

export default DropdownItem
