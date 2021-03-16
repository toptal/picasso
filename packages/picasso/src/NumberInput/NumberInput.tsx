import React, { forwardRef, useRef, RefObject, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import ButtonBase from '@material-ui/core/ButtonBase'

import OutlinedInput, { Props as OutlinedInputProps } from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import Container from '../Container'
import { useCombinedRefs } from '../utils'
import { ArrowDownMinor16, ArrowUpMinor16 } from '../Icon'
import styles from './styles'

export interface Props
  extends Omit<
      OmitInternalProps<OutlinedInputProps>,
      'defaultValue' | 'type' | 'multiline' | 'rows'
    >,
    BaseProps {
  /** Value of the `input` element. */
  value?: string | number
  /** Minimum value for the `input` element */
  min?: number | string
  /** Maximum value for the `input` element */
  max?: number | string
  /** Next value of the `input` element will be calculated based on step */
  step?: number | string
  /** Should controls be hidden or not */
  hideControls?: boolean
  /** Specify icon which should be rendered inside NumberInput */
  icon?: ReactNode
  /** Indicates whether component is in error state */
  error?: boolean
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Callback invoked when `NumberInput` changes its state. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type NumberAdornmentProps = {
  min: number | string
  max: number | string
  step: number | string
  value: Props['value']
  inputRef: RefObject<HTMLInputElement>
  classes: Record<string, string>
  disabled?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
) as PropertyDescriptor).set!

const NumberAdornment = (props: NumberAdornmentProps) => {
  const { step, min, max, value, inputRef, classes, disabled } = props

  const normalizedStep = Number(step)
  const normalizedValue = Number(value)
  const normalizedMin = Number(min)
  const normalizedMax = Number(max)

  const fireEvent = (nextValue: number) => {
    const input = inputRef.current

    nativeInputValueSetter.call(input, nextValue)

    const event = new Event('input', {
      bubbles: true,
      cancelable: true
    })

    if (input) {
      input.dispatchEvent(event)
    }
  }

  const handleUpClick = () => {
    if (typeof value === 'undefined') {
      return
    }

    let nextValue = normalizedValue + normalizedStep

    if (nextValue <= max) {
      if (normalizedValue < normalizedMin + normalizedStep) {
        nextValue = normalizedMin + normalizedStep
      }

      fireEvent(nextValue)
    } else if (normalizedValue !== normalizedMax) {
      nextValue = normalizedMax
      fireEvent(nextValue)
    }
  }

  const handleDownClick = () => {
    if (typeof value === 'undefined') {
      return
    }

    let nextValue = normalizedValue - normalizedStep

    if (nextValue >= min) {
      if (normalizedValue > normalizedMax - normalizedStep) {
        nextValue = normalizedMax - normalizedStep
      }

      fireEvent(nextValue)
    } else if (normalizedValue !== normalizedMin) {
      nextValue = normalizedMin
      fireEvent(nextValue)
    }
  }

  return (
    <InputAdornment position='end'>
      <Container flex direction='column' inline>
        <ButtonBase
          disabled={disabled}
          classes={{
            root: classes.control,
            disabled: classes.controlDisabled
          }}
          onClick={handleUpClick}
        >
          <ArrowUpMinor16 />
        </ButtonBase>
        <ButtonBase
          disabled={disabled}
          classes={{
            root: classes.control,
            disabled: classes.controlDisabled
          }}
          onClick={handleDownClick}
        >
          <ArrowDownMinor16 />
        </ButtonBase>
      </Container>
    </InputAdornment>
  )
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNumberInput'
})

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  function NumberInput (props, ref) {
    const {
      step = 1,
      min = -Infinity,
      max = Infinity,
      hideControls,
      value,
      onChange,
      disabled,
      error,
      onResetClick,
      enableReset,
      width,
      icon,
      ...rest
    } = props

    const classes = useStyles()

    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    const endAdornment = hideControls ? null : (
      <NumberAdornment
        step={step}
        min={min}
        max={max}
        value={value}
        inputRef={inputRef}
        classes={classes}
        disabled={disabled}
      />
    )

    const startAdornment = icon ? (
      <InputAdornment position='start' disablePointerEvents>
        {icon}
      </InputAdornment>
    ) : null

    return (
      <OutlinedInput
        classes={{
          root: classes.root,
          input: classes.input
        }}
        inputProps={{
          ...rest,
          step,
          min,
          max
        }}
        width={width}
        onResetClick={onResetClick}
        enableReset={enableReset}
        error={error}
        inputRef={inputRef}
        type='number'
        value={value}
        disabled={disabled}
        onChange={onChange}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
      />
    )
  }
)

NumberInput.defaultProps = {
  onChange: () => {},
  value: 0,
  step: 1,
  min: -Infinity,
  max: Infinity,
  hideControls: false
}

NumberInput.displayName = 'NumberInput'

export default NumberInput
