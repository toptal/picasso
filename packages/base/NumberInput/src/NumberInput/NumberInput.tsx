import type { ReactNode } from 'react'
import React, { forwardRef, useRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, OmitInternalProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import {
  useCombinedRefs,
  usePropDeprecationWarning,
} from '@toptal/picasso-utils'
import type { Props as OutlinedInputProps } from '@toptal/picasso-outlined-input'
import { useFieldsLayoutContext } from '@toptal/picasso-form'

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
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Callback invoked when `NumberInput` changes its state. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  highlight?: 'autofill'
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoNumberInput',
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
      status,
      onResetClick,
      enableReset,
      width,
      icon,
      size,
      testIds,
      highlight,
      ...rest
    } = props

    // TODO: [FX-4715]
    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'NumberInput',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    const { layout } = useFieldsLayoutContext()

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
          root: cx(classes.root, {
            [classes.highlightAutofill]: highlight === 'autofill',
            [classes.horizontalLayout]: layout === 'horizontal',
          }),
          input: classes.input,
        }}
        inputProps={{
          ...rest,
          step,
          min,
          max,
        }}
        width={width}
        onResetClick={onResetClick}
        enableReset={enableReset}
        status={error ? 'error' : status}
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
