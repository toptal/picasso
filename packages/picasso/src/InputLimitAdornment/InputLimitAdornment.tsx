import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'
import InputAdornment from '../InputAdornment'
import { InputProps } from '../Input'

export interface Props
  extends Pick<InputProps, 'multiline' | 'limit' | 'testIds'> {
  counter: NonNullable<InputProps['counter']>
  charsLength: number
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputLimitAdornment'
})

const hasRemainingCounter = ({
  counter,
  limit
}: Pick<Props, 'counter' | 'limit'>) =>
  Boolean(counter === 'remaining' && limit)

const getCharsTillLimit = ({
  charsLength,
  limit,
  counter
}: Pick<Props, 'charsLength' | 'limit' | 'counter'>) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  hasRemainingCounter({ counter, limit }) ? limit! - charsLength : charsLength

const getMultilineLabel = ({
  multiline,
  charsTillLimit,
  counter,
  limit
}: Pick<Props, 'multiline' | 'counter' | 'limit'> & {
  charsTillLimit: number
}) => {
  if (!multiline) {
    return null
  }

  if (hasRemainingCounter({ counter, limit })) {
    return charsTillLimit >= 0 ? 'characters left' : 'over the limit'
  }

  return 'characters entered'
}

const InputLimitAdornment = (props: Props) => {
  const classes = useStyles()
  const { multiline, charsLength, counter, limit, testIds } = props

  const charsTillLimit = getCharsTillLimit({
    counter,
    limit,
    charsLength
  })
  const multilineLabel = getMultilineLabel({
    multiline,
    counter,
    limit,
    charsTillLimit
  })

  return (
    <InputAdornment
      data-testid={testIds?.inputAdornment}
      position='end'
      className={cx({
        [classes.limiterMultiline]: multiline
      })}
      disablePointerEvents
    >
      <span
        className={cx(classes.limiterLabel, {
          [classes.limiterLabelError]: charsTillLimit <= 0
        })}
      >
        {multiline ? Math.abs(charsTillLimit) : charsTillLimit} {multilineLabel}
      </span>
    </InputAdornment>
  )
}

export default InputLimitAdornment
