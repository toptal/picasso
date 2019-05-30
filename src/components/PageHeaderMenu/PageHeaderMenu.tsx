import React, { FunctionComponent, ReactNode } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import UserBadge from '../UserBadge'
import Dropdown from '../Dropdown'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends StandardProps {
  /** User full name to display */
  name: string
  /** User's organization name */
  organization?: string
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Menu content */
  children: ReactNode
}

export const PageHeaderMenu: FunctionComponent<Props> = ({
  name,
  organization,
  avatar,
  classes,
  className,
  style,
  children
}) => {
  return (
    <Dropdown
      className={cx(classes.root, className)}
      classes={{ content: classes.content }}
      style={style}
      content={children}
      offset={{ top: 'xsmall' }}
    >
      <UserBadge
        invert
        center
        size='xsmall'
        classes={{
          avatar: classes.avatar,
          name: cx(classes.name, classes.truncateText)
        }}
        name={name}
        avatar={avatar}
      >
        {organization && (
          <Typography className={classes.truncateText} invert size='small'>
            {organization}
          </Typography>
        )}
      </UserBadge>
      <Dropdown.Arrow style={{ color: 'white' }} />
    </Dropdown>
  )
}

PageHeaderMenu.defaultProps = {}

PageHeaderMenu.displayName = 'PageHeaderMenu'

export default withStyles(styles)(PageHeaderMenu)
