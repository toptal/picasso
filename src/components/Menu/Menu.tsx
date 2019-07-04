import React, { FunctionComponent, HTMLAttributes } from 'react'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'

import MenuItem from '../MenuItem'
import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'

export type ListAttributes = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>
interface Props extends StandardProps, ListAttributes {}

interface StaticProps {
  Item: typeof MenuItem
}

export const Menu: FunctionComponent<Props> & StaticProps = ({
  children,
  className,
  classes,
  style,
  ...rest
}) => {
  return (
    <MUIMenuList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={className}
      style={style}
      classes={classes}
    >
      {children}
    </MUIMenuList>
  )
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default withStyles(styles)(Menu) as PicassoComponent<Props, StaticProps>
