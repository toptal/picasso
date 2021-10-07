import React from 'react'
import cx from 'classnames'
import { JssProps } from '@toptal/picasso-shared'

import type { VariantType, AvatarSizeType } from './Avatar'

type ImagePlaceholderProps = {
  className?: string
  variant: VariantType
  size: AvatarSizeType
} & JssProps
const ImagePlaceholder = ({
  size,
  variant,
  className,
  classes
}: ImagePlaceholderProps) => {
  return (
    <div
      className={cx(
        classes.textContainer,
        classes[variant],
        classes[size],
        classes.clippedCorner,
        className
      )}
    />
  )
}

export default ImagePlaceholder
