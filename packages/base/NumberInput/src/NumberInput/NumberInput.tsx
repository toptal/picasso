import type { ReactNode } from 'react'
import React, { forwardRef, useRef } from 'react'
import type { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { useCombinedRefs } from '@toptal/picasso-utils'
import type { Props as OutlinedInputProps } from '@toptal/picasso-outlined-input'
import { twJoin } from '@toptal/picasso-tailwind-merge'

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
  /** Enable value change on mouse wheel */
  enableChangeOnMouseWheel?: boolean
  /** Should controls be hidden or not */
  hideControls?: boolean
  /** Specify icon which should be rendered inside NumberInput */
  icon?: ReactNode
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Callback invoked when `NumberInput` changes its state. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  highlight?: 'autofill'
}

export const NumberInput = forwardRef<HTMLInputElement, Props>(
  function NumberInput(props, ref) {
    const {
      step = 1,
      min = -Infinity,
      max = Infinity,
      hideControls,
      enableChangeOnMouseWheel,
      value,
      onChange,
      disabled,
      status,
      onResetClick,
      enableReset,
      endAdornment: customEndAdornment = null,
      width,
      icon,
      size,
      testIds,
      highlight,
      ...rest
    } = props

    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    const defaultEndAdornment = (
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

    const endAdornment = hideControls ? (
      customEndAdornment
    ) : (
      <>
        {customEndAdornment}
        {defaultEndAdornment}
      </>
    )

    const startAdornment = icon ? (
      <InputAdornment position='start' disablePointerEvents>
        {icon}
      </InputAdornment>
    ) : null

    return (
      <OutlinedInput
        classes={{
          root: 'pr-0 cursor-text',
          input: twJoin(
            // required to remove arrows in WebKit based browsers
            '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 ',
            '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 ',
            // required to remove arrows in Firefox
            '[-moz-appearance:textfield]'
          ),
        }}
        highlight={highlight}
        inputProps={{
          ...rest,
          step,
          // TODO: [FX-6102] Add test for wheel event
          onWheel: enableChangeOnMouseWheel
            ? undefined
            : event => event.currentTarget.blur(),
        }}
        width={width}
        onResetClick={onResetClick}
        enableReset={enableReset}
        status={status}
        inputRef={inputRef}
        type='number'
        value={value}
        disabled={disabled}
        onChange={onChange}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        size={size}
        testIds={testIds}
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
  size: 'medium',
  status: 'default',
}

NumberInput.displayName = 'NumberInput'

export default NumberInput
