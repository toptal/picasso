import React, { HTMLAttributes, useCallback } from 'react'
import { StandardProps, SizeType } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { AVATAR_INITIALS_LIMIT } from '../utils/constants'
import getNameInitials from '../utils/get-name-initials'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import TextAvatar from './TextAvatar/TextAvatar'
import IconAvatar from './IconAvatar/IconAvatar'
import AvatarWrapper from './AvatarWrapper/AvatarWrapper'
import styles from './styles'
import { Pencil16, Pencil24 } from '../Icon'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Alt text */
  alt?: string
  /** User full name to display initials on the avatar */
  name?: string
  /** Size */
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  /** Photo url */
  src?: string
  /** Variant of the avatar shape */
  variant?: 'square' | 'portrait' | 'landscape'
  /** Callback to show edit-on-click and receive event */
  onEdit?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  testIds?: {
    wrapper?: string
    icon?: string
    image?: string
    text?: string
    editContainer?: string
  }
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAvatarWrapper',
})

export const Avatar = (props: Props) => {
  const {
    alt,
    src,
    className,
    name,
    size,
    style,
    variant,
    testIds,
    onEdit,
    ...rest
  } = props

  const renderAvatar = useCallback(() => {
    if (src) {
      return (
        <ImageAvatar
          alt={alt}
          className={className}
          name={name}
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          size={size!}
          src={src}
          style={style}
          data-testid={testIds?.image}
        />
      )
    }

    if (name) {
      const initials = getNameInitials(name)
      const isLongText = initials.length >= AVATAR_INITIALS_LIMIT

      return (
        <TextAvatar
          className={className}
          fontSize={isLongText ? 'small' : 'large'}
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          size={size!}
          data-testid={testIds?.text}
        >
          {initials}
        </TextAvatar>
      )
    }

    return (
      <IconAvatar
        data-testid={testIds?.icon}
        className={className}
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        size={size!}
      />
    )
  }, [
    size,
    alt,
    className,
    src,
    testIds?.icon,
    testIds?.image,
    testIds?.text,
    name,
    style,
  ])

  const classes = useStyles(props)
  const isEditable = Boolean(onEdit)

  const pencilIcon =
    size === 'xxsmall' || size === 'xsmall' ? <Pencil16 /> : <Pencil24 />

  return (
    <AvatarWrapper
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      variant={variant!}
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      size={size!}
      data-testid={testIds?.wrapper}
      {...rest}
    >
      {isEditable && (
        <div
          data-testid={testIds?.editContainer}
          className={classes.editContainer}
          onClick={onEdit}
        >
          {pencilIcon}
        </div>
      )}
      {renderAvatar()}
    </AvatarWrapper>
  )
}

Avatar.defaultProps = {
  size: 'xsmall',
  variant: 'square',
}

Avatar.displayName = 'Avatar'

export default Avatar
