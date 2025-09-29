import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { containerTextClassBySize, typographyTextClassBySize } from './styles'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export type FontSize = SizeType<'small' | 'large'>

interface Props extends BaseProps {
  children: ReactNode
  fontSize?: FontSize
  size?: Size
}

const TextAvatar = ({
  children,
  className,
  style,
  'data-testid': dataTestID,
  fontSize,
  size = 'large',
  'data-private': dataPrivate,
}: Props) => (
  <div
    className={twMerge('uppercase', containerTextClassBySize[size], className)}
    style={style}
    data-private={dataPrivate}
  >
    <Typography
      data-testid={dataTestID}
      className={twJoin(
        fontSize ? typographyTextClassBySize[fontSize] : '',
        'leading-[1.5em]'
      )}
      invert
    >
      {children}
    </Typography>
  </div>
)

export default TextAvatar
