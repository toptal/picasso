import React from 'react'
import type { ReactNode } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'
import type { ContainerProps } from '../Container'
import Container from '../Container'
import { useFieldsLayoutContext } from '../FieldsLayout/FieldsLayoutContext'

export interface Props extends Omit<ContainerProps, 'children'> {
  /** Content */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoFormActionsContainer',
})

const FormActionsContainer = ({ children, ...rest }: Props) => {
  const { layout } = useFieldsLayoutContext()
  const classes = useStyles()

  if (layout === 'vertical') {
    return <Container {...rest}>{children}</Container>
  }

  return (
    <Container className={cx(classes.root)} {...rest}>
      <div></div>
      <div>{children}</div>
    </Container>
  )
}

export default FormActionsContainer
