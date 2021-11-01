import React from 'react'
import cx from 'classnames'
import { JssProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Image from '../../Image'
import Logo from '../../Logo'
import type {
  AvatarSizeType,
  Props as AvatarProps,
  VariantType
} from '../Avatar'
import styles from './styles'

export type Props = {
  size: AvatarSizeType
  src: string
  variant: VariantType
} & Pick<AvatarProps, 'alt' | 'name' | 'style' | 'className'>

type LogoProps = {
  size: AvatarSizeType
} & JssProps

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoImageAvatar'
})

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

const ImageAvatar = (props: Props) => {
  const { alt, className, name, size, src, style } = props
  const classes = useStyles(props)

  if (!src) {
    return null
  }

  return (
    <>
      <Image
        alt={alt || String(name)}
        className={cx(classes.image, className)}
        src={src}
        style={style}
      />
      {renderLogo({ classes, size })}
    </>
  )
}

export default ImageAvatar
