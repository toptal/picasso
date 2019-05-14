import React, { FunctionComponent } from 'react'
import MUIMenuList from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'

import MenuItem from '../MenuItem'
import { StandardProps, JssProps, OmitInternalProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {}

interface StaticProps {
  Item: typeof MenuItem
}

export const Menu: FunctionComponent<Props> & StaticProps = ({
  children,
  className,
  classes,
  style
}) => {
  return (
    <MUIMenuList className={className} style={style} classes={classes}>
      {children}
    </MUIMenuList>
  )
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default withStyles(styles)(Menu) as FunctionComponent<
  OmitInternalProps<Props> & Partial<JssProps>
> &
  StaticProps
