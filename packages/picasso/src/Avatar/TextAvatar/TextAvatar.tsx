/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactNode } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { SizeType } from '@toptal/picasso-shared'

import { Typography } from '../..'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'
import styles from './styles'
import type { AvatarSizeType, VariantType } from '../Avatar'

type Props = {
  className?: string
  fontSize?: SizeType<'small' | 'large'>
  children: ReactNode
  size: AvatarSizeType
  variant: VariantType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTextAvatar'
})

const TextAvatar = ({
  children,
  className,
  fontSize,
  size,
  variant
}: Props) => {
  const classes = useStyles()

  return (
    <>
      <ImagePlaceholder className={className} size={size} variant={variant} />
      <Typography className={cx(classes.root, classes[fontSize!])} invert>
        {children}
      </Typography>
    </>
  )
}

TextAvatar.defaultProps = {
  size: 'large'
}

export default TextAvatar
