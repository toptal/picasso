import React, { HTMLAttributes, useCallback } from 'react'
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import { AVATAR_INITIALS_LIMIT } from '../utils/constants'
import getNameInitials from '../utils/get-name-initials'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import TextAvatar from './TextAvatar/TextAvatar'
import IconAvatar from './IconAvatar/IconAvatar'
import AvatarGroup from './AvatarGroup/AvatarGroup'
import AvatarWrapper from './AvatarWrapper/AvatarWrapper'

export type VariantType = 'square' | 'portrait' | 'landscape'
export type AvatarSizeType = SizeType<
  'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'
>

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Alt text */
  alt?: string
  /** User full name to display initials on the avatar */
  name?: string
  /** Size */
  size?: AvatarSizeType
  /** Photo url */
  src?: string
  /** Variant of the avatar shape */
  variant?: VariantType
  testIds?: {
    wrapper?: string
    icon?: string
    image?: string
    text?: string
  }
}

export const Avatar = ({
  alt,
  src,
  className,
  name,
  size,
  style,
  variant,
  testIds,
  ...rest
}: Props) => {
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
    style
  ])

  return (
    <AvatarWrapper
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      variant={variant!}
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      size={size!}
      data-testid={testIds?.wrapper}
      {...rest}
    >
      {renderAvatar()}
    </AvatarWrapper>
  )
}

Avatar.defaultProps = {
  size: 'xsmall',
  variant: 'square'
}

Avatar.displayName = 'Avatar'

export default Object.assign(Avatar, {
  Group: AvatarGroup
})
