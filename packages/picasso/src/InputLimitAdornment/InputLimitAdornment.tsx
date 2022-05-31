import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import InputAdornment from '../InputAdornment'

type CounterType = 'remaining' | 'entered'

export interface Props {
  charsLength: number
  limit: number
  multiline?: boolean
  counter: CounterType
  testIds?: {
    inputAdornment?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputLimitAdornment',
})

const hasRemainingCounter = (counter: CounterType) => counter === 'remaining'

const getCharsTillLimit = (
  charsLength: number,
  counter: CounterType,
  limit: number
) => (hasRemainingCounter(counter) ? limit - charsLength : charsLength)

const getMultilineLabel = ({
  multiline,
  charsTillLimit,
  counter,
}: Pick<Props, 'multiline' | 'counter'> & {
  charsTillLimit: number
}) => {
  if (!multiline) {
    return null
  }

  if (hasRemainingCounter(counter)) {
    return charsTillLimit >= 0 ? 'characters left' : 'over the limit'
  }

  return 'characters entered'
}

const InputLimitAdornment = (props: Props) => {
  const classes = useStyles()
  const { multiline, charsLength, counter, limit, testIds } = props

  const charsTillLimit = getCharsTillLimit(charsLength, counter, limit)
  const multilineLabel = getMultilineLabel({
    multiline,
    charsTillLimit,
    counter,
  })

  return (
    <InputAdornment
      data-testid={testIds?.inputAdornment}
      position='end'
      className={cx({
        [classes.limiterMultiline]: multiline,
      })}
      disablePointerEvents
    >
      <span
        className={cx(classes.limiterLabel, {
          [classes.limiterLabelError]: charsTillLimit <= 0,
        })}
      >
        {multiline ? Math.abs(charsTillLimit) : charsTillLimit} {multilineLabel}
      </span>
    </InputAdornment>
  )
}

export default InputLimitAdornment
