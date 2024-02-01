import React from 'react'
import type { ReactNode } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'
import type { ContainerProps } from '../Container'
import Container from '../Container'
import { useFieldsLayoutContext } from '../FieldsLayout/FieldsLayoutContext'
import { createLabelWidthStyles } from '../FormField/styles'

export interface Props extends Omit<ContainerProps, 'children'> {
  /** Content */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoFormActionsContainer',
})

const FormActionsContainer = ({ children, style, ...rest }: Props) => {
  const { layout, labelWidth } = useFieldsLayoutContext()
  const classes = useStyles()

  if (layout === 'vertical') {
    return <Container {...rest}>{children}</Container>
  }

  const labelWidthStyles = createLabelWidthStyles(labelWidth)

  return (
    <Container
      className={cx(classes.horizontalLayout)}
      {...rest}
      style={{ ...style, ...labelWidthStyles }}
    >
      <div />
      <div>{children}</div>
    </Container>
  )
}

export default FormActionsContainer
