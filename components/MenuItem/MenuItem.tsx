import React from 'react'
import MUIMenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'

import ButtonBase from '../ButtonBase'

import './styles'

export interface Props {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const MenuItem: React.FunctionComponent<Props & MenuItemProps> = ({
  onClick,
  children,
  ...menuItemProps
}) => {
  return (
    <MUIMenuItem {...menuItemProps} onClick={onClick}>
      <ButtonBase>{children}</ButtonBase>
    </MUIMenuItem>
  )
}

MenuItem.defaultProps = {
  onClick: () => {}
}

export default MenuItem
