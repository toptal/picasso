/* eslint-disable complexity */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps, SizeType } from '@toptal/picasso-shared'
import { Avatar } from '@toptal/picasso-avatar'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

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
    classes,
    ...rest
  } = props

  const UserBadgeAvatar = React.isValidElement(avatar) ? (
    avatar
  ) : (
    <Avatar
      name={name}
      size={size}
      src={avatar as string}
      className={classes?.avatar}
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
      <Typography inline invert={invert} className='ml-[7px]' size='medium'>
        {title}
      </Typography>
    )
  }

  const userName = renderName ? (
    renderName(name, invert)
  ) : (
    <Typography
      inline
      variant='heading'
      size='small'
      invert={invert}
      className={classes?.name}
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
      className={twMerge('text-[1rem]', className)}
      style={style}
    >
      {UserBadgeAvatar}
      <Container flex direction='column' className='min-w-0 ml-[0.75em]'>
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
