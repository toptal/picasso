import React from 'react'
import { JssProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import type { AvatarSizeType, VariantType } from './Avatar'
import ImagePlaceholder from './ImagePlaceholder'
import { Profile16 } from '..'

type WithIconProps = {
  size: AvatarSizeType
  variant: VariantType
  className?: string
} & JssProps
const WithIcon = ({ classes, size, variant, className }: WithIconProps) => {
  return (
    <>
      <ImagePlaceholder
        variant={variant}
        size={size}
        className={className}
        classes={classes}
      />
      <Profile16
        className={cx(classes.centeredContent, classes[`${size}Icon`])}
        color='white'
      />
    </>
  )
}

export default WithIcon
