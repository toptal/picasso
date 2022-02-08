import React, { useMemo } from 'react'
import { toH } from 'hast-to-hyperscript'
import { BaseProps } from '@toptal/picasso-shared'

import { ASTType } from './types'
import Container from '../Container'
import mapToPicasso from './utils/mapToPicasso/mapToPicasso'

export interface Props extends BaseProps {
  value: ASTType
}

interface WrapperProps extends BaseProps {
  children: React.ReactNode
}

const Wrapper = ({
  children,
  style,
  className,
  'data-testid': dataTestId
}: WrapperProps) => {
  return (
    <Container
      style={style}
      data-testid={dataTestId}
      className={className}
      gap='xsmall'
      flex
      direction='column'
    >
      {children}
    </Container>
  )
}

export const ASTRenderer = ({
  value,
  style,
  className,
  'data-testid': dataTestId
}: Props) => {
  const jsx = useMemo(
    () =>
      toH(React.createElement, value) as React.DetailedReactHTMLElement<
        {},
        HTMLElement
      >,
    [value]
  )
  const mappedJsx = useMemo(() => mapToPicasso(jsx), [jsx])

  return (
    <Wrapper className={className} style={style} data-testid={dataTestId}>
      {mappedJsx}
    </Wrapper>
  )
}

export default ASTRenderer
