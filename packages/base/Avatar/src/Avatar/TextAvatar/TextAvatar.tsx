import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { containerTextClassBySize, typographyTextClassBySize } from './styles'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export type FontSize = SizeType<'small' | 'large'>

interface Props extends BaseProps {
  children: ReactNode
  fontSize?: FontSize
  size: Size
}

const TextAvatar = ({
  children,
  className,
  style,
  'data-testid': dataTestID,
  fontSize,
  size,
  'data-private': dataPrivate,
}: Props) => (
  <div
    className={twMerge(
      'uppercase absolute top-2/4 left-2/4 [transform:translate(-50%,-50%)]',
      containerTextClassBySize[size],
      className
    )}
    style={style}
    data-private={dataPrivate}
  >
    <Typography
      data-testid={dataTestID}
      className={fontSize ? typographyTextClassBySize[fontSize] : ''}
      invert
    >
      {children}
    </Typography>
  </div>
)

TextAvatar.defaultProps = {
  size: 'large',
}

export default TextAvatar
