import React, { FunctionComponent, ReactNode } from 'react'
import MUIMenuItem from '@material-ui/core/MenuItem'

import { BaseProps, JssProps } from '../Picasso'
import './styles'

interface Props extends BaseProps, Partial<JssProps> {
  value?: string | string[] | number
  disabled?: boolean
  children?: ReactNode
}

const MenuItem: FunctionComponent<Props> = ({
  value,
  disabled,
  children,
  classes,
  className,
  style
}) => (
  <MUIMenuItem
    value={value}
    disabled={disabled}
    classes={classes}
    className={className}
    style={style}
  >
    {children}
  </MUIMenuItem>
)

MenuItem.displayName = 'MenuItem'

export default MenuItem
