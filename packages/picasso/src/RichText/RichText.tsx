import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import type { ASTType } from './types'
import Container from '../Container'
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
    <Container
      style={style}
      data-testid={dataTestId}
      className={className}
      gap='xsmall'
      flex
      direction='column'
    >
      {richText}
    </Container>
  )
}

export default RichText
