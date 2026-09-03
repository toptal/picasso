import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Image } from '@toptal/picasso-image'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  src: string
  alt?: string
  name?: string
}

const ImageAvatar = (props: Props) => {
  const {
    alt,
    className,
    name,
    src,
    style,
    'data-testid': dataTestId,
    'data-private': dataPrivate,
  } = props

  return (
    <Image
      alt={alt || name || ''}
      className={twMerge('object-cover w-full h-full', className)}
      src={src}
      style={style}
      data-testid={dataTestId}
      data-private={dataPrivate}
    />
  )
}

export default ImageAvatar
