import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import { ASTType } from './types'
import Container from '../Container'
import useRichText from './hooks/useRichText'

export interface Props extends BaseProps {
  value: ASTType
}

export const RichText = ({
  value,
  style,
  className,
  'data-testid': dataTestId
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
