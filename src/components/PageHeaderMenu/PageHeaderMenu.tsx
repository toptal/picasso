import React, { FunctionComponent, ReactNode } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import UserBadge from '../UserBadge'
import Dropdown from '../Dropdown'
import styles from './styles'

export interface Props extends StandardProps {
  name: string
  avatar: string
  content: ReactNode
}

export const PageHeaderMenu: FunctionComponent<Props> = ({
  name,
  avatar,
  classes,
  className,
  style,
  content
}) => {
  return (
    <Dropdown
      className={cx(classes.root, className)}
      style={style}
      content={content}
      offset={{ top: 'xsmall' }}
    >
      <UserBadge
        invert
        size='xsmall'
        classes={{ avatar: classes.avatar }}
        name={name}
        avatar={avatar}
      />
      <Dropdown.Arrow style={{ color: 'white' }} />
    </Dropdown>
  )
}

PageHeaderMenu.defaultProps = {}

PageHeaderMenu.displayName = 'PageHeaderMenu'

export default withStyles(styles)(PageHeaderMenu)
