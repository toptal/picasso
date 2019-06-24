import React, { FunctionComponent, ReactNode } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import renamePropsWithWarning from 'react-deprecate'

import { StandardProps } from '../Picasso'
import UserBadge from '../UserBadge'
import Dropdown from '../Dropdown'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends StandardProps {
  /** User full name to display */
  name: string
  /** Additional content of PageHeaderMenu */
  meta?: ReactNode
  organization?: string // deprecated in favor of `meta`
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Menu content */
  children: ReactNode
}

export const PageHeaderMenu: FunctionComponent<Props> = ({
  name,
  meta,
  avatar,
  classes,
  className,
  style,
  children
}) => {
  const metaContent =
    typeof meta === 'string' ? (
      <Typography className={classes.truncateText} invert size='small'>
        {meta}
      </Typography>
    ) : (
      meta
    )

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
        {meta && metaContent}
      </UserBadge>
      <Dropdown.Arrow style={{ color: 'white' }} />
    </Dropdown>
  )
}

PageHeaderMenu.defaultProps = {}

PageHeaderMenu.displayName = 'PageHeaderMenu'

export default renamePropsWithWarning(withStyles(styles)(PageHeaderMenu), {
  organization: 'meta'
})
