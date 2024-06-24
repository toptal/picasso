import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { Logo } from '@toptal/picasso-logo'
import { Image } from '@toptal/picasso-image'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export interface Props extends BaseProps {
  size: Size
  src: string
  alt?: string
  name?: string
}

type LogoProps = {
  size: Size
}

const AvatarLogo = ({ size }: LogoProps) => {
  const isTooSmall = ['small', 'xsmall', 'xxsmall'].includes(size)

  if (isTooSmall) {
    return null
  }

  return (
    <div
      className={'flex absolute bottom-4 left-4'}
      role='img'
      aria-label='photo placeholder'
    >
      <Logo emblem variant='white' className={'w-[1.0625rem] h-6'} />
    </div>
  )
}

const ImageAvatar = (props: Props) => {
  const {
    alt,
    className,
    name,
    size,
    src,
    style,
    'data-testid': dataTestId,
    'data-private': dataPrivate,
  } = props

  return (
    <>
      <Image
        alt={alt || name || ''}
        className={twMerge(
          'object-cover w-full h-full absolute left-0 top-0 [image-rendering:-webkit-optimize-contrast]',
          className
        )}
        src={src}
        style={style}
        data-testid={dataTestId}
        data-private={dataPrivate}
      />
      <AvatarLogo size={size} />
    </>
  )
}

export default ImageAvatar
