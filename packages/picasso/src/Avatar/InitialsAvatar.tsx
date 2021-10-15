import React from 'react'
import { JssProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import { Typography } from '..'
import ImagePlaceholder from './ImagePlaceholder'
import getNameInitials from '../utils/get-name-initials'
import { AVATAR_INITIALS_LIMIT } from '../utils/constants'
import type { VariantType, AvatarSizeType } from './Avatar'

type WithInitialsProps = {
  name: string
  variant: VariantType
  size: AvatarSizeType
  className?: string
} & JssProps
const WithInitials = ({
  classes,
  name,
  variant,
  size,
  className
}: WithInitialsProps) => {
  const initials = getNameInitials(name)

  return (
    <>
      <ImagePlaceholder
        variant={variant}
        size={size}
        className={className}
        classes={classes}
      />
      <Typography
        className={cx(classes.text, classes.centeredContent, {
          [classes.textCapLimit]: initials.length >= AVATAR_INITIALS_LIMIT
        })}
        invert
      >
        {initials}
      </Typography>
    </>
  )
}

export default WithInitials
