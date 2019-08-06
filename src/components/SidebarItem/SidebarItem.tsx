import React, { FunctionComponent, ReactElement, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Container from '../Container'
import MenuItem from '../MenuItem'
import Accordion from '../Accordion'
import styles from './styles'

export interface Props extends StandardProps {
  icon?: ReactElement
  selected?: boolean
  collapsible?: boolean
  menu?: ReactElement
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const SidebarItem: FunctionComponent<Props> = ({
  children,
  icon,
  selected,
  collapsible,
  menu,
  classes,
  className,
  style,
  onClick,
  ...rest
}) => {
  const hasIcon = Boolean(icon)
  const hasMenu = Boolean(menu)

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(event)
    }

    event.stopPropagation()
  }

  const menuItem = (
    <MenuItem
      {...rest}
      style={style}
      className={cx(classes.root, { [classes.selected]: selected }, className)}
      onClick={handleMenuItemClick}
    >
      <Container inline flex alignItems='center'>
        {icon}
        <Container
          className={cx(classes.label, { [classes.withIcon]: hasIcon })}
        >
          <Container className={cx(classes.labelContent)}>{children}</Container>
        </Container>
      </Container>
    </MenuItem>
  )

  if (hasMenu && collapsible) {
    return (
      <Accordion
        className={classes.accordion}
        classes={{
          summary: classes.summary,
          details: classes.details,
          content: classes.content,
          expandIcon: classes.expandIcon
        }}
        content={menu}
      >
        {menuItem}
      </Accordion>
    )
  }

  return (
    <Fragment>
      {menuItem}
      {menu}
    </Fragment>
  )
}

SidebarItem.defaultProps = {}

SidebarItem.displayName = 'SidebarItem'

export default withStyles(styles)(SidebarItem)
