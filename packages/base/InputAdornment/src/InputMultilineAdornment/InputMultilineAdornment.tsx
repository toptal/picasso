import type { ReactNode } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { Container } from '@toptal/picasso-container'

import styles from './styles'

export interface Props {
  children: ReactNode
  error?: boolean
  'data-testid'?: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputMultilineAdornment',
})

const InputMultilineAdornment = (props: Props) => {
  const { children, error, 'data-testid': dataTestId } = props
  const classes = useStyles()

  return (
    <Container
      flex
      data-testid={dataTestId}
      className={cx(classes.root, {
        [classes.error]: error,
      })}
    >
      {children}
    </Container>
  )
}

export default InputMultilineAdornment
