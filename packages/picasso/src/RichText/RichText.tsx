import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import { ASTType } from './types'
import Container from '../Container'
import useRichText from './hooks/useRichText'

export interface Props extends BaseProps {
  /** If output of RichTextEditor is already in database, always use AST.
   * in case we need to showcase preview before sending data to BE, we can pass
   * the HTML output
   */
  value: ASTType | string
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
