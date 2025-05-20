import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { ASTType } from './types'
import useRichText from './hooks/useRichText'

export interface Props extends BaseProps {
  /**
   * [hast](https://github.com/syntax-tree/hast) format
   */
  value: ASTType
}

export const RichText = ({
  value,
  style,
  className,
  'data-testid': dataTestId,
}: Props) => {
  const richText = useRichText(value)

  return (
    <div
      style={style}
      data-testid={dataTestId}
      className={twMerge('gap-2 flex flex-col break-words', className)}
    >
      {richText}
    </div>
  )
}

export default RichText
