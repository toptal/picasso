import React from 'react'
import type { ReactNode } from 'react'
import type { ContainerProps } from '@toptal/picasso-container'
import { Container } from '@toptal/picasso-container'

import { useFieldsLayoutContext } from '../FieldsLayout'
import {
  createLabelWidthStyles,
  horizontalLayoutClasses,
} from '../FormField/styles'

export interface Props extends Omit<ContainerProps, 'children'> {
  /** Content */
  children: ReactNode
}

const FormActionsContainer = ({ children, style, ...rest }: Props) => {
  const { layout, labelWidth } = useFieldsLayoutContext()

  if (layout === 'vertical') {
    return <Container {...rest}>{children}</Container>
  }

  const labelWidthStyles = createLabelWidthStyles(labelWidth)

  return (
    <Container
      className={horizontalLayoutClasses}
      {...rest}
      style={{ ...style, ...labelWidthStyles }}
    >
      <div />
      <div>{children}</div>
    </Container>
  )
}

export default FormActionsContainer
