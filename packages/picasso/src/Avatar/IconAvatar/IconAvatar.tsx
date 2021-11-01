import React from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import type { AvatarSizeType, VariantType } from '../Avatar'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'
import { Profile16 } from '../..'
import styles from './styles'

type Props = {
  className?: string
  size: AvatarSizeType
  variant: VariantType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoIconAvatar'
})

const IconAvatar = ({ size, className, variant }: Props) => {
  const classes = useStyles()

  return (
    <>
      <ImagePlaceholder className={className} size={size} variant={variant} />
      <Profile16
        className={cx(classes.root, classes[`${size}Icon`])}
        color='white'
      />
    </>
  )
}

export default IconAvatar
