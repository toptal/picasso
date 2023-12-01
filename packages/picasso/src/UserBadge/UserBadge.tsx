/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable complexity */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { StandardProps, SizeType } from '@toptal/picasso-shared'
import Avatar from '@toptal/picasso-avatar'
import Typography from '@toptal/picasso-typography'
import Container from '@toptal/picasso-container'

import styles from './styles'

type AlignmentType = boolean | 'auto'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** User full name to display */
  name: string
  /** Function responsible for rendering the user's name with a custom component */
  renderName?: (name: string, invert?: boolean) => ReactNode
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Size */
  size?: SizeType<'xxsmall' | 'xsmall' | 'small'>
  /** Title that is rendered on the right of name */
  title?: string
  /** Function responsible for rendering the user's title with a custom component */
  renderTitle?: (title: string, invert?: boolean) => ReactNode
  /** Invert color */
  invert?: boolean
  /**
   * Center text vertically
   *
   * * auto - if no children is provided text will be centered
   * * manual - based on `center` prop `boolean` value
   */
  center?: AlignmentType
  /** Additional content of UserBadge */
  children?: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoUserBadge',
})

export const UserBadge = forwardRef<HTMLDivElement, Props>(function UserBadge(
  props,
  ref
) {
  const {
    avatar,
    name,
    renderName,
    size,
    title,
    renderTitle,
    invert,
    center,
    children,
    className,
    style,
    // Avoid passing external classes inside the rest props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: externalClasses,
    ...rest
  } = props
  const classes = useStyles(props)

  const UserBadgeAvatar = React.isValidElement(avatar) ? (
    avatar
  ) : (
    <Avatar
      className={classes.avatar}
      name={name}
      size={size}
      src={avatar as string}
    />
  )

  // if 'auto' then center if children are null
  const shouldCenter = center === true || (center === 'auto' && !children)
  const alignItems = shouldCenter ? 'center' : 'flex-start'
  let userTitle

  if (title) {
    userTitle = renderTitle ? (
      renderTitle(title, invert)
    ) : (
      <Typography
        inline
        invert={invert}
        className={classes.title}
        size='medium'
      >
        {title}
      </Typography>
    )
  }

  const userName = renderName ? (
    renderName(name, invert)
  ) : (
    <Typography
      className={classes.name}
      inline
      variant='heading'
      size='small'
      invert={invert}
    >
      {name}
    </Typography>
  )

  return (
    <Container
      {...rest}
      ref={ref}
      flex
      alignItems={alignItems}
      className={cx(classes.root, className)}
      style={style}
    >
      {UserBadgeAvatar}
      <Container flex direction='column' className={classes.infoContainer}>
        <Container flex alignItems='center'>
          {userName}
          {userTitle}
        </Container>
        {children}
      </Container>
    </Container>
  )
})

UserBadge.defaultProps = {
  center: 'auto',
  invert: false,
  size: 'xsmall',
}

UserBadge.displayName = 'UserBadge'

export default UserBadge
