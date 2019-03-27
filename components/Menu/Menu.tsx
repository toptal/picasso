import React from 'react'
import MUIMenu, { MenuProps } from '@material-ui/core/Menu'

interface Props {
  open: boolean
  anchorEl: null | HTMLElement | ((element: HTMLElement) => HTMLElement)
  onClose: React.ReactEventHandler<{}>
}

const Menu: React.FunctionComponent<Props & MenuProps> = ({
  open,
  children,
  anchorEl,
  onClose,
  ...menuProps
}) => {
  return (
    <MUIMenu {...menuProps} open={open} anchorEl={anchorEl} onClose={onClose}>
      {children}
    </MUIMenu>
  )
}

Menu.defaultProps = {
  onClose: () => {},
  open: false
}

Menu.displayName = 'Menu'

export default Menu
