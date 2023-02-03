import React, { ReactNode } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import cx from 'classnames'

import Container from '../Container'
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
