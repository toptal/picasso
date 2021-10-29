import React from 'react'
import cx from 'classnames'
import { JssProps, OmitInternalProps } from '@toptal/picasso-shared'

import Image from '../Image'
import Logo from '../Logo'
import { Props as ImageProps } from '../Image/Image'
import type {
  AvatarSizeType,
  VariantType,
  Props as AvatarProps
} from './Avatar'
import { isSSR } from '../utils'

const isBrowserSupportsObjectFit =
  !isSSR() && 'objectFit' in document.documentElement.style

type LogoProps = {
  size: AvatarSizeType
} & JssProps
const renderLogo = ({ size, classes }: LogoProps) => {
  const isTooSmall = ['small', 'xsmall', 'xxsmall'].includes(size)

  if (isTooSmall) {
    return null
  }

  return (
    <div className={classes.logoContainer}>
      <Logo emblem variant='white' className={classes.logo} />
    </div>
  )
}

// You will be surprised, but it's a IE11 fix for `object-fit: cover` for images
const IE11Image = ({ style, src, ...rest }: OmitInternalProps<ImageProps>) => (
  <div
    style={{
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      ...style
    }}
    {...rest}
  />
)

type WithImageProps = {
  variant: VariantType
  size: AvatarSizeType
  src: string
} & Pick<AvatarProps, 'alt' | 'name' | 'style' | 'className'> &
  JssProps
const WithImage = ({
  alt,
  classes,
  className,
  name,
  size,
  src,
  style,
  variant
}: WithImageProps) => {
  const ImageComponent = isBrowserSupportsObjectFit ? Image : IE11Image

  if (!src) {
    return null
  }

  return (
    <>
      <ImageComponent
        alt={alt || String(name)}
        className={cx(
          classes.image,
          classes[variant],
          classes[size],
          classes.clippedCorner,
          className
        )}
        src={src}
        style={style}
      />
      {renderLogo({ classes, size })}
    </>
  )
}

export default WithImage
