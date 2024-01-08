import React from 'react'
import type { ReactNode } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { ContainerProps } from '@toptal/picasso-container'
import { Container } from '@toptal/picasso-container'

import styles from './styles'
import { useFieldsLayoutContext } from '../FieldsLayout'

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
      <div />
      <div>{children}</div>
    </Container>
  )
}

export default FormActionsContainer
