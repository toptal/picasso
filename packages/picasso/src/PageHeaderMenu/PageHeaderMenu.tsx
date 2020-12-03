import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import { useBreakpoint } from '../utils'
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

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoPageHeaderMenu'
})

export const PageHeaderMenu = forwardRef<HTMLDivElement, Props>(
  function PageHeaderMenu(props, ref) {
    const {
      name,
      meta,
      avatar,
      classes: externalClasses,
      className,
      style,
      children,
      ...rest
    } = props
    const classes = mergeClasses(useStyles(props), externalClasses)
    const isCompactLayout = useBreakpoint(['small', 'medium'])

    const metaContent =
      typeof meta === 'string' ? (
        <Typography className={classes.truncateText} invert size='small'>
          {meta}
        </Typography>
      ) : (
        meta
      )

    const content = isCompactLayout ? (
      <>
        <UserBadge
          center
          size='xsmall'
          classes={{
            root: classes.contentUserBadge,
            avatar: classes.avatar,
            name: cx(classes.name, classes.truncateText)
          }}
          name={name}
          avatar={avatar}
        >
          {meta && metaContent}
        </UserBadge>
        {children}
      </>
    ) : (
      children
    )

    const trigger = isCompactLayout ? (
      <Avatar
        size='xsmall'
        classes={{
          root: classes.avatar,
          xsmall: classes.xsmall
        }}
        name={name}
        src={avatar as string}
      />
    ) : (
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
    )

    return (
      <Dropdown
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        classes={{ content: classes.content }}
        style={style}
        content={content}
        offset={{ top: isCompactLayout ? 0.8 : 'xsmall' }}
        popperOptions={{
          modifiers: {
            flip: { enabled: false },
            preventOverflow: {
              padding: 0
            }
          }
        }}
      >
        {trigger}
        <Dropdown.Arrow className={classes.arrow} />
      </Dropdown>
    )
  }
)

PageHeaderMenu.defaultProps = {}

PageHeaderMenu.displayName = 'PageHeaderMenu'

export default PageHeaderMenu
