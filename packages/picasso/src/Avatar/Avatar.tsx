import React, { FunctionComponent, HTMLAttributes } from 'react'
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import { AVATAR_INITIALS_LIMIT } from '../utils/constants'
import getNameInitials from '../utils/get-name-initials'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import TextAvatar from './TextAvatar/TextAvatar'
import IconAvatar from './IconAvatar/IconAvatar'
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
}

export const Avatar: FunctionComponent<Props> = ({
  alt,
  src,
  className,
  name,
  size,
  style,
  variant,
  ...rest
}) => {
  const renderAvatar = () => {
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
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          variant={variant!}
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
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          variant={variant!}
        >
          {initials}
        </TextAvatar>
      )
    }

    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    return <IconAvatar className={className} size={size!} variant={variant!} />
  }

  return (
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    <AvatarWrapper size={size!} {...rest}>
      {renderAvatar()}
    </AvatarWrapper>
  )
}

Avatar.defaultProps = {
  size: 'xsmall',
  variant: 'square'
}

Avatar.displayName = 'Avatar'

export default Avatar
