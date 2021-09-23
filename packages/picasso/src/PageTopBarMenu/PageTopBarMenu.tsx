/* eslint-disable complexity */
import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import { useBreakpoint } from '../utils'
import UserBadge from '../UserBadge'
import Avatar from '../Avatar'
import Dropdown from '../Dropdown'
import Typography from '../Typography'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTopBarMenu'
})

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** User full name to display */
  name: string
  /** Additional content */
  meta?: ReactNode
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Menu content */
  children: ReactNode
}

export const PageTopBarMenu = forwardRef<HTMLDivElement, Props>(
  function PageTopBarMenu(props, ref) {
    const { name, meta, avatar, className, style, children, ...rest } = props
    const classes = useStyles()

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
          size='xxsmall'
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
        size='xxsmall'
        className={classes.xsmall}
        name={name}
        src={avatar as string}
      />
    ) : (
      <UserBadge
        invert
        center
        size='xxsmall'
        classes={{
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

PageTopBarMenu.defaultProps = {}

PageTopBarMenu.displayName = 'TopBarMenu'

export default PageTopBarMenu
