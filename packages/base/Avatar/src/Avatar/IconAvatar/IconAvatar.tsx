import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { Profile16 } from '@toptal/picasso-icons'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { classBySize } from './styles'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

interface Props extends BaseProps {
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
}

const IconAvatar = ({
  size,
  'data-testid': dataTestId,
  className,
  style,
}: Props) => {
  return (
    <Profile16
      className={twMerge(
        className,
        'absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]',
        classBySize[size]
      )}
      color='white'
      data-testid={dataTestId}
      style={style}
    />
  )
}

export default IconAvatar
