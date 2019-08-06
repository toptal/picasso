import React, { FunctionComponent, ReactElement, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Container from '../Container'
import MenuItem from '../MenuItem'
import styles from './styles'

export interface Props extends StandardProps {
  icon: ReactElement
  selected: boolean
  collapsible: boolean
  menu: ReactElement
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
  ...rest
}) => {
  const hasIcon = Boolean(icon)

  return (
    <Fragment>
      <MenuItem
        {...rest}
        style={style}
        className={cx(
          classes.root,
          { [classes.selected]: selected },
          className
        )}
      >
        <Container inline flex alignItems='center'>
          {icon}
          <Container
            className={cx(classes.label, { [classes.withIcon]: hasIcon })}
          >
            <Container className={cx(classes.labelContent)}>
              {children}
            </Container>
          </Container>
        </Container>
      </MenuItem>
      {menu}
    </Fragment>
  )
}

SidebarItem.defaultProps = {}

SidebarItem.displayName = 'SidebarItem'

export default withStyles(styles)(SidebarItem)
