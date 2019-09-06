import React, { forwardRef, ReactNode, HTMLAttributes, Fragment } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import { useScreenSize, isScreenSize } from '../utils'
import UserBadge from '../UserBadge'
import Avatar from '../Avatar'
import Dropdown from '../Dropdown'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** User full name to display */
  name: string
  /** Additional content of PageHeaderMenu */
  meta?: ReactNode
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Menu content */
  children: ReactNode
}

export const PageHeaderMenu = forwardRef<HTMLDivElement, Props>(
  function PageHeaderMenu(
    { name, meta, avatar, classes, className, style, children, ...rest },
    ref
  ) {
    const windowSize = useScreenSize()
    const isMobile = isScreenSize('small', windowSize)

    const metaContent =
      typeof meta === 'string' ? (
        <Typography className={classes.truncateText} invert size='small'>
          {meta}
        </Typography>
      ) : (
        meta
      )

    if (isMobile) {
      return (
        <Dropdown
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={ref}
          className={cx(classes.root, className)}
          classes={{ content: classes.content }}
          style={style}
          content={
            <Fragment>
              <UserBadge
                center
                size='xsmall'
                classes={{
                  root: classes.avatarRootMobile,
                  avatar: classes.avatar,
                  name: cx(classes.name, classes.truncateText)
                }}
                name={name}
                avatar={avatar}
              >
                {meta && metaContent}
              </UserBadge>
              {children}
            </Fragment>
          }
          offset={{ top: 'xsmall' }}
        >
          <Avatar
            size='xsmall'
            classes={{
              root: classes.avatar,
              xsmall: classes.xsmall
            }}
            src={avatar as string}
          />
          <Dropdown.Arrow className={classes.arrow} />
        </Dropdown>
      )
    }

    return (
      <Dropdown
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
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
        <Dropdown.Arrow className={classes.arrow} />
      </Dropdown>
    )
  }
)

PageHeaderMenu.defaultProps = {}

PageHeaderMenu.displayName = 'PageHeaderMenu'

export default withStyles(styles)(PageHeaderMenu)
