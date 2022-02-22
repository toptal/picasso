import React, { forwardRef, useRef, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'

import OutlinedInput, { Props as OutlinedInputProps } from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import { useCombinedRefs } from '../utils'
import styles from './styles'
import { NumberInputEndAdornment } from '../NumberInputEndAdornment'

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

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoNumberInput'
})

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  function NumberInput(props, ref) {
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
      size,
      ...rest
    } = props

    const classes = useStyles(props)

    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    const endAdornment = hideControls ? null : (
      <NumberInputEndAdornment
        step={step}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        size={size}
        inputRef={inputRef}
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
        size={size}
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
  hideControls: false,
  size: 'medium'
}

NumberInput.displayName = 'NumberInput'

export default NumberInput
