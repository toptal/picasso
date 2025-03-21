import type { HTMLAttributes } from 'react'
import React, { useCallback } from 'react'
import type { StandardProps, SizeType } from '@toptal/picasso-shared'
import { AVATAR_INITIALS_LIMIT, getNameInitials } from '@toptal/picasso-utils'

import ImageAvatar from './ImageAvatar/ImageAvatar'
import TextAvatar from './TextAvatar/TextAvatar'
import IconAvatar from './IconAvatar/IconAvatar'
import AvatarWrapper from './AvatarWrapper/AvatarWrapper'
import AvatarEditContainer from './AvatarEditContainer/AvatarEditContainer'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Alt text */
  alt?: string
  /** User full name to display initials on the avatar */
  name?: string
  /** Size */
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  /** Photo url */
  src?: string
  /** Displays Toptal logo */
  showEmblem?: boolean
  /** Callback to show edit-on-click and receive event */
  onEdit?: (event: React.MouseEvent) => void
  testIds?: {
    wrapper?: string
    icon?: string
    image?: string
    text?: string
    editContainer?: string
  }
}

export const Avatar = (props: Props) => {
  const {
    alt,
    src,
    className,
    name,
    size,
    style,
    showEmblem,
    testIds,
    onEdit,
    'data-private': dataPrivate,
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
          data-private={dataPrivate}
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
          data-private={dataPrivate}
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
    dataPrivate,
  ])

  const isEditable = Boolean(onEdit)

  const avatar = (
    <AvatarWrapper
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      size={size!}
      showEmblem={showEmblem}
      data-testid={testIds?.wrapper}
      {...rest}
    >
      {renderAvatar()}
    </AvatarWrapper>
  )

  if (isEditable) {
    return (
      <div className='relative'>
        {avatar}
        {isEditable && (
          <AvatarEditContainer
            data-testid={testIds?.editContainer}
            onClick={onEdit}
            size={size}
          />
        )}
      </div>
    )
  }

  return avatar
}

Avatar.defaultProps = {
  size: 'xsmall',
}

Avatar.displayName = 'Avatar'

export default Avatar
