import React, { FunctionComponent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  StandardProps,
  SizeType,
  OmitInternalProps
} from '@toptal/picasso-shared'

import Image from '../Image'
import { Props as ImageProps } from '../Image/Image'
import Logo from '../Logo'
import Typography from '../Typography'
import getNameInitials from '../utils/get-name-initials'
import styles from './styles'

type VariantType = 'square' | 'portrait' | 'landscape'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Alt text */
  alt?: string
  /** User full name to display initials on the avatar */
  name: string
  /**
   * Size
   * @default xsmall
   */
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  /** Photo url */
  src?: string
  /**
   * Variant of the avatar shape
   * @default square
   */
  variant?: VariantType
}

const isBrowserSupportsObjectFit = 'objectFit' in document.documentElement.style

const renderLogo = ({ classes, src, size }: Partial<Props>) => {
  if (!src || ['small', 'xsmall', 'xxsmall'].includes(size!)) {
    return null
  }

  return (
    <div className={classes!.logoContainer}>
      <Logo emblem variant='white' className={classes!.logo} />
    </div>
  )
}

const renderInitials = ({ classes, src, name }: Partial<Props>) => {
  if (src || !name) {
    return null
  }

  const initials = getNameInitials(name)

  return (
    <Typography
      className={cx(classes!.text, {
        [classes!.textCapLimit]: initials.length >= 3
      })}
      invert
    >
      {initials}
    </Typography>
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  />
)

export const Avatar: FunctionComponent<Props> = ({
  alt,
  src,
  classes,
  className,
  name,
  size,
  style,
  variant,
  ...rest
}) => {
  const sizeClassName = classes[size!]
  const variantClassName = classes[variant!]
  console.log('classes', classes)

  const InputComponent = isBrowserSupportsObjectFit ? Image : IE11Image

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...rest} className={cx(classes.root, sizeClassName)}>
      {src ? (
        <InputComponent
          alt={alt || name}
          className={cx(
            classes.image,
            variantClassName,
            sizeClassName,
            classes.clippedCorner,
            className
          )}
          src={src}
          style={style}
        />
      ) : (
        <div
          className={cx(
            classes.textContainer,
            variantClassName,
            sizeClassName,
            classes.clippedCorner,
            className
          )}
        />
      )}
      {renderInitials({ classes, src, name })}
      {renderLogo({ classes, src, size })}
    </div>
  )
}

Avatar.defaultProps = {
  size: 'xsmall',
  variant: 'square'
}

Avatar.displayName = 'Avatar'

export default withStyles(styles)(Avatar)
