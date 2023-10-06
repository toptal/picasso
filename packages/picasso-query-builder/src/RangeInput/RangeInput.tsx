import React, { useEffect } from 'react'
import { Container, NumberInput, Typography } from '@toptal/picasso'
import type { ValidationResult } from 'react-querybuilder'
import { makeStyles } from '@material-ui/core/styles'

import type {
  RangeFieldOptions,
  RangeValue,
  ValueEditorValidationProps,
} from '../types/query-builder'
import styles from './styles'

type Props = RangeFieldOptions & {
  /**
   * value either accepts a range value or an empty string by default
   */
  value: RangeValue | ''
  onChange: (val: RangeValue) => void
} & ValueEditorValidationProps

const useStyles = makeStyles(styles)

export const RangeInput = ({
  value,
  step = 1,
  min,
  max,
  onChange,
  icon,
  validation,
  handleTouched,
}: Props) => {
  const classes = useStyles()

  const fromValue = (value as RangeValue).from ?? ''
  const toValue = (value as RangeValue).to ?? ''

  const validationReasons = (validation as ValidationResult)?.reasons
  const fromValueError = validationReasons && validationReasons[0]
  const toValueError = validationReasons && validationReasons[1]

  useEffect(() => {
    if (!value) {
      onChange({ from: min, to: max })
    }
  }, [max, min, onChange, value])

  return (
    <>
      <Typography variant='body' className={classes.label}>
        From
      </Typography>
      <Container flex className={classes.input}>
        <NumberInput
          hideControls
          enableReset
          icon={icon}
          width='full'
          value={fromValue}
          min={min}
          max={toValue}
          step={step}
          onChange={event => {
            onChange({
              from: event.target.value ? +event.target.value : undefined,
              to: (value as RangeValue)?.to,
            })
          }}
          onBlur={() => handleTouched?.(true)}
          status={value && fromValueError ? 'error' : 'default'}
          onResetClick={() => {
            onChange({
              from: min,
              to: (value as RangeValue)?.to,
            })
          }}
        />
      </Container>
      <Typography variant='body' className={classes.label}>
        To
      </Typography>
      <Container flex className={classes.input}>
        <NumberInput
          hideControls
          enableReset
          icon={icon}
          width='full'
          value={toValue}
          min={fromValue}
          max={max}
          step={step}
          status={value && toValueError ? 'error' : 'default'}
          onChange={event =>
            onChange({
              to: event.target.value ? +event.target.value : undefined,
              from: (value as RangeValue)?.from,
            })
          }
          onResetClick={() => {
            onChange({
              from: (value as RangeValue)?.from,
              to: max,
            })
          }}
        />
      </Container>
    </>
  )
}
