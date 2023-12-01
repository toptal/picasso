/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { InputAdornment } from '@material-ui/core'
import InputMultilineAdornment from '@toptal/picasso-input-multiline-adornment'

import styles from './styles'

type CounterType = 'remaining' | 'entered'

export interface Props {
  charsLength: number
  limit: number
  multiline?: boolean
  counter: CounterType
  testIds?: {
    inputAdornment?: string
    message?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputLimitAdornment',
})

const hasRemainingCounter = (counter: CounterType) => counter === 'remaining'
const formatCharacters = (count: number) =>
  count === 1 ? 'character' : 'characters'

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
    return charsTillLimit >= 0
      ? `${formatCharacters(charsTillLimit)} left`
      : 'over the limit'
  }

  return `${formatCharacters(charsTillLimit)} entered`
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
  const error = charsTillLimit <= 0

  if (multiline) {
    return (
      <InputMultilineAdornment
        data-testid={testIds?.inputAdornment}
        error={error}
      >
        <span data-testid={testIds?.message}>
          <span translate='no'>{Math.abs(charsTillLimit)}</span>{' '}
          <span>{multilineLabel}</span>
        </span>
      </InputMultilineAdornment>
    )
  }

  return (
    <InputAdornment
      data-testid={testIds?.inputAdornment}
      position='end'
      disablePointerEvents
      className={cx(classes.limiterLabel, {
        [classes.limiterLabelError]: error,
      })}
    >
      <span data-testid={testIds?.message}>
        <span translate='no'>{charsTillLimit}</span>{' '}
        <span>{multilineLabel}</span>
      </span>
    </InputAdornment>
  )
}

export default InputLimitAdornment
