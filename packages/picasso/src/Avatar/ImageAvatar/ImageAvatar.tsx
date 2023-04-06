import React from 'react'
import cx from 'classnames'
import type { JssProps, BaseProps, SizeType } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import Image from '../../Image'
import Logo from '../../Logo'
import styles from './styles'

export interface Props extends BaseProps {
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  src: string
  alt?: string
  name?: string
}

type LogoProps = {
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
} & JssProps

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoImageAvatar',
})

const AvatarLogo = ({ size, classes }: LogoProps) => {
  const isTooSmall = ['small', 'xsmall', 'xxsmall'].includes(size)

  if (isTooSmall) {
    return null
  }

  return (
    <div
      className={classes.logoContainer}
      role='img'
      aria-label='photo placeholder'
    >
      <Logo emblem variant='white' className={classes.logo} />
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
  } = props
  const classes = useStyles(props)

  return (
    <>
      <Image
        alt={alt || name || ''}
        className={cx(classes.image, className)}
        src={src}
        style={style}
        data-testid={dataTestId}
      />
      <AvatarLogo classes={classes} size={size} />
    </>
  )
}

export default ImageAvatar
