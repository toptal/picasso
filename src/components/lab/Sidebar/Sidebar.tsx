import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps, PicassoComponent } from '../../Picasso'
import Container from '../../Container'
import SidebarMenu from '../SidebarMenu'
import SidebarItem from '../SidebarItem'
import styles from './styles'

export interface Props extends StandardProps {}

interface StaticProps {
  Menu: typeof SidebarMenu
  Item: typeof SidebarItem
}

export const Sidebar: FunctionComponent<Props> & StaticProps = ({
  children,
  className,
  style,
  classes
}) => (
  <Container
    flex
    direction='column'
    style={style}
    className={cx(classes.root, className)}
  >
    <div className={classes.spacer} />
    {children}
  </Container>
)

Sidebar.defaultProps = {}

Sidebar.displayName = 'Sidebar'

Sidebar.Menu = SidebarMenu

Sidebar.Item = SidebarItem

export default withStyles(styles)(Sidebar) as PicassoComponent<
  Props,
  StaticProps
>
