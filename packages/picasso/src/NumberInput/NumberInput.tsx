import React, { forwardRef, useRef, RefObject } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import ButtonBase from '@material-ui/core/ButtonBase'

import OutlinedInput, { Props as OutlinedInputProps } from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import Container from '../Container'
import { useCombinedRefs } from '../utils'
import styles from './styles'

export interface Props
  extends Omit<OmitInternalProps<OutlinedInputProps>, 'defaultValue'>,
    BaseProps {
  value: string | number
  min?: number | string
  max?: number | string
  hideControls?: boolean
  step?: number | string
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

const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
) as PropertyDescriptor).set!

const NumberAdornment = (props: NumberAdornmentProps) => {
  const { step, min, max, value, inputRef, classes, disabled } = props

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
    if (typeof value !== 'undefined') {
      const nextValue = Number(value) + Number(step)

      if (nextValue <= max) {
        fireEvent(nextValue)
      }
    }
  }

  const handleDownClick = () => {
    if (typeof value !== 'undefined') {
      const nextValue = Number(value) - Number(step)

      if (nextValue >= min) {
        fireEvent(nextValue)
      }
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
          <span className={classes.arrowUp} />
        </ButtonBase>
        <ButtonBase
          disabled={disabled}
          classes={{
            root: classes.control,
            disabled: classes.controlDisabled
          }}
          onClick={handleDownClick}
        >
          <span className={classes.arrowDown} />
        </ButtonBase>
      </Container>
    </InputAdornment>
  )
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoNumberInput'
})

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  function NumberInput(props, ref) {
    const {
      step,
      min,
      max,
      hideControls,
      value,
      onChange,
      disabled,
      ...rest
    } = props

    const classes = useStyles(props)

    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    const endAdornment = hideControls ? null : (
      <NumberAdornment
        step={step!}
        min={min!}
        max={max!}
        value={value}
        inputRef={inputRef}
        classes={classes}
        disabled={disabled}
      />
    )

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
        ref={inputRef}
        type='number'
        value={value}
        disabled={disabled}
        onChange={onChange}
        endAdornment={endAdornment}
      />
    )
  }
)

NumberInput.defaultProps = {
  onChange: () => {},
  step: 1,
  min: -Infinity,
  max: Infinity,
  hideControls: false
}

NumberInput.displayName = 'NumberInput'

export default NumberInput
