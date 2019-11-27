import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import Avatar from '../Avatar'
import Typography from '../Typography'
import Container from '../Container'
import styles from './styles'

type AlignmentType = boolean | 'auto'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** User full name to display */
  name: string
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Size */
  size?: SizeType<'xsmall' | 'small'>
  /** Title that is rendered on the right of name */
  title?: string
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

export const UserBadge = forwardRef<HTMLDivElement, Props>(function UserBadge(
  {
    avatar,
    name,
    size,
    title,
    invert,
    center,
    children,
    classes,
    className,
    style,
    ...rest
  },
  ref
) {
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

  const userTitle = title && (
    <Typography inline invert={invert} className={classes.title} size='medium'>
      {title}
    </Typography>
  )

  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      flex
      alignItems={alignItems}
      className={cx(classes.root, className)}
      style={style}
    >
      {UserBadgeAvatar}
      <Container flex direction='column' left='small'>
        <Container>
          <Typography
            className={classes.name}
            inline
            variant='heading'
            size='small'
            invert={invert}
          >
            {name}
          </Typography>
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
  size: 'xsmall'
}

UserBadge.displayName = 'UserBadge'

export default withStyles(styles)(UserBadge)
