import type { ChangeEventHandler, FocusEvent, HTMLAttributes } from 'react'
import React, { forwardRef, useState } from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import {
  createCheckedIconClassNames,
  createInputClassNames,
  createRootClassNames,
  createUncheckedIconClassNames,
} from './styles'

export interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean
  disabled?: boolean
  withLabel?: boolean
  name?: string
  value?: string | number | boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const RadioControl = forwardRef<HTMLSpanElement, Props>(
  function RadioControl(props, ref) {
    const {
      className,
      style,
      checked,
      disabled = false,
      withLabel = false,
      id,
      name,
      value,
      onChange,
      ...rest
    } = props

    // mirrors the focus-visible state as a DOM attribute (`data-focused`) the
    // same way the previous MUI polyfill applied a class — pseudo-class state
    // alone does not survive Cypress-Happo's serialized re-render
    const [focused, setFocused] = useState(false)

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(event.target.matches(':focus-visible'))
    }

    const handleBlur = () => {
      setFocused(false)
    }

    const inputValue = typeof value === 'boolean' ? String(value) : value

    return (
      <span
        {...rest}
        ref={ref}
        data-focused={focused || undefined}
        className={twMerge(
          cx(...createRootClassNames({ disabled, withLabel })),
          className
        )}
        style={style}
      >
        <input
          type='radio'
          className={cx(...createInputClassNames())}
          id={id}
          name={name}
          value={inputValue}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span className={cx(...createUncheckedIconClassNames(checked))} />
        <span className={cx(...createCheckedIconClassNames(checked))} />
      </span>
    )
  }
)

RadioControl.displayName = 'RadioControl'

export default RadioControl
