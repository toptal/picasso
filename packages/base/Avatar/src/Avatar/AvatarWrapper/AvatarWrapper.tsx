import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { classBySizeAndVariant, clipClassBySize } from './styles'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export type Variant = 'square' | 'portrait' | 'landscape'

export interface Props extends BaseProps {
  children: ReactNode
  size: Size
  variant: Variant
}

const AvatarWrapper = (props: Props) => {
  const {
    children,
    className,
    style,
    'data-testid': dataTestId,
    size,
    variant,
  } = props

  return (
    <div
      style={style}
      data-testid={dataTestId}
      className={twMerge(
        className,
        'relative bg-gray-500 text-[1rem] shrink-0 grow-0',
        classBySizeAndVariant[size][variant],
        clipClassBySize[size]
      )}
    >
      {children}
    </div>
  )
}

export default AvatarWrapper
