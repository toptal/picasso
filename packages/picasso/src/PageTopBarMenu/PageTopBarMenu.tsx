/* eslint-disable complexity */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'

import { SPACING_0, SPACING_2, useBreakpoint } from '../utils'
import UserBadge from '../UserBadge'
import Avatar from '../Avatar'
import { DropdownCompound as Dropdown } from '../DropdownCompound'
import Typography from '../Typography'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTopBarMenu',
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

    const isCompactLayout = useBreakpoint(['xs', 'sm', 'md'])

    const metaContent =
      typeof meta === 'string' ? (
        <Typography
          className={classes.truncateText}
          invert={!isCompactLayout}
          size='xsmall'
        >
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
            name: cx(classes.name, classes.truncateText),
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
      <Avatar size='xxsmall' name={name} src={avatar as string} />
    ) : (
      <UserBadge
        invert
        center
        size='xxsmall'
        classes={{
          name: cx(classes.name, classes.truncateText),
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
        // TODO: find proper value, it used to be 0.8 instead of SPACING_0
        offset={{ top: isCompactLayout ? SPACING_0 : SPACING_2 }}
        popperOptions={{
          modifiers: {
            flip: { enabled: false },
            preventOverflow: {
              padding: 0,
            },
          },
        }}
      >
        {trigger}
        <Dropdown.Arrow className={classes.arrow} />
      </Dropdown>
    )
  }
)

PageTopBarMenu.defaultProps = {}

PageTopBarMenu.displayName = 'PageTopBarMenu'

export default PageTopBarMenu
