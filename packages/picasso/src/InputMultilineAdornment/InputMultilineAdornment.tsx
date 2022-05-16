import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'
import InputAdornment from '../InputAdornment'
import { Status } from '../OutlinedInput'
import InputLimitAdornment from '../InputLimitAdornment'
import { CheckMinor24 } from '../Icon'

type CounterType = 'remaining' | 'entered'

export interface Props {
  charsLength?: number
  limit?: number
  multiline?: boolean
  counter?: CounterType
  status?: Status
  testIds?: {
    inputAdornment?: string
  }
}

const useStyles = makeStyles<Theme>(styles)

const InputMultilineAdornment = (props: Props) => {
  const { charsLength, limit, multiline, counter, status, testIds } = props
  const classes = useStyles()
  const showCounter = !!charsLength && !!limit && !!counter

  return (
    <InputAdornment
      data-testid={testIds?.inputAdornment}
      position='end'
      className={classes.multilineAdornment}
      disablePointerEvents
    >
      {status === 'success' && (
        <span className={classes.multilineStatusCheckMark}>
          <CheckMinor24 color='green' />
        </span>
      )}
      {showCounter && (
        <InputLimitAdornment
          charsLength={charsLength}
          counter={counter}
          limit={limit}
          multiline={multiline}
        />
      )}
    </InputAdornment>
  )
}

export default InputMultilineAdornment
