/* eslint-disable complexity */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { useContext, forwardRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import { useBreakpoint } from '@toptal/picasso-utils'
import { UserBadge } from '@toptal/picasso-user-badge'
import { Avatar } from '@toptal/picasso-avatar'
import { Typography } from '@toptal/picasso-typography'
import { DropdownCompound as Dropdown } from '@toptal/picasso-dropdown'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import styles from './styles'
import { PageTopBarContext } from '../PageTopBar'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTopBarMenu',
})

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** User full name to display */
  name: string
  /** Additional content */
  meta?: ReactNode
  /** Photo url */
  avatar?: string
  /** Menu content */
  children: ReactNode
}

export const PageTopBarMenu = forwardRef<HTMLDivElement, Props>(
  function PageTopBarMenu(props, ref) {
    const {
      name,
      meta,
      avatar,
      className,
      style,
      children,
      'data-private': dataPrivate,
      ...rest
    } = props
    const classes = useStyles()

    const { variant } = useContext(PageTopBarContext)
    const invert = variant === 'light'

    const isCompactLayout = useBreakpoint(['xs', 'sm', 'md'])

    const metaContent =
      typeof meta === 'string' ? (
        <Typography
          className={classes.truncateText}
          invert={!isCompactLayout && !invert}
          size='xsmall'
          data-private={dataPrivate}
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
          data-private={dataPrivate}
          classes={{
            root: classes.contentUserBadge,
            avatar: classes.avatar,
            name: cx('!font-[400]', classes.truncateText),
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
        data-private={dataPrivate}
        name={name}
        src={avatar}
      />
    ) : (
      <UserBadge
        invert={!invert}
        center
        size='xxsmall'
        classes={{
          name: cx('!font-[400]', classes.truncateText),
        }}
        name={name}
        data-private={dataPrivate}
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
              padding: 0,
            },
          },
        }}
      >
        {trigger}
        <Dropdown.Arrow
          className={twJoin(
            'xs:max-lg:ml-2',
            invert ? 'text-graphite-700' : 'text-white'
          )}
        />
      </Dropdown>
    )
  }
)

PageTopBarMenu.defaultProps = {}

PageTopBarMenu.displayName = 'PageTopBarMenu'

export default PageTopBarMenu
