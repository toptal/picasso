import React from 'react'
import MUIMenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'

import './styles'

const MenuItem: React.FunctionComponent<MenuItemProps> = props => {
  return <MUIMenuItem {...props} />
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
