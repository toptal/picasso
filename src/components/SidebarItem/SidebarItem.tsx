import React, { FunctionComponent, ReactElement, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Container from '../Container'
import MenuItem, { MenuItemAttributes } from '../MenuItem/MenuItem'
import Accordion from '../Accordion'
import { ArrowDropDown16 } from '../Icon'
import styles from './styles'

export interface Props extends StandardProps, MenuItemAttributes {
  /** Pass icon to be used as part of item */
  icon?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Whether to render disabled item */
  disabled?: boolean
  /** If item has menu defines can menu be collapsed */
  collapsible?: boolean
  /** Renders nested sidebar menu */
  menu?: ReactElement
  /** Callback when item is clicked */
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
    if (!hasMenu) {
      onClick!(event)
    }
  }

  const menuItem = (
    <MenuItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      style={style}
      className={cx(
        classes.root,
        { [classes.selected]: !hasMenu && selected },
        className
      )}
      onClick={handleMenuItemClick}
      selected={!hasMenu && selected}
    >
      <Container inline flex alignItems='center'>
        {icon}
        <Container
          className={cx(classes.label, { [classes.withIcon]: hasIcon })}
        >
          <Container className={classes.labelContent}>{children}</Container>
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
        bordered={false}
        // @ts-ignore
        expandIcon={ArrowDropDown16}
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

SidebarItem.defaultProps = {
  collapsible: false,
  selected: false,
  onClick: () => {}
}

SidebarItem.displayName = 'SidebarItem'

export default withStyles(styles)(SidebarItem)
