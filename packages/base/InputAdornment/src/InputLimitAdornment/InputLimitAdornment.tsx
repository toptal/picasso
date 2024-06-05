import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { InputAdornment } from '../InputAdornment'
import { InputMultilineAdornment } from '../InputMultilineAdornment'

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
      className={twJoin(
        'text-[0.625rem] leading-4',
        error ? 'text-red-500' : 'text-gray-600'
      )}
    >
      <span data-testid={testIds?.message}>
        <span translate='no'>{charsTillLimit}</span>{' '}
        <span>{multilineLabel}</span>
      </span>
    </InputAdornment>
  )
}

export default InputLimitAdornment
