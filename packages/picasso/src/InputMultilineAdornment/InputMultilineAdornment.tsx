import React, { ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import InputAdornment from '../InputAdornment'
import { Status } from '../OutlinedInput'
import InputValidIconAdornment from '../InputValidIconAdornment'

export interface Props {
  children: ReactNode
  status?: Status
  size?: 'small' | 'medium' | 'large'
  testIds?: {
    inputAdornment?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputMultilineAdornment',
})

const InputMultilineAdornment = (props: Props) => {
  const { children, status, testIds, size } = props
  const classes = useStyles()

  return (
    <InputAdornment
      data-testid={testIds?.inputAdornment}
      position='end'
      className={cx(classes.multilineAdornment, {
        [classes.large]: size === 'large',
      })}
      disablePointerEvents
    >
      {children}
      {status === 'success' && <InputValidIconAdornment />}
    </InputAdornment>
  )
}

export default InputMultilineAdornment
