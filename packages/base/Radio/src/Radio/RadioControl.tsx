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

/**
 * @deprecated [PF-1994] Prefer `className`.
 */
export interface RadioClasses {
  /** Applied to the root `<span>` wrapper */
  root?: string
  /** Applied to the root `<span>` while the `Radio` is disabled */
  disabled?: string
  /** Applied to the visually-hidden `<input type="radio">` */
  input?: string
  /** Applied to the unchecked-state icon `<span>` */
  uncheckedIcon?: string
  /** Applied to the checked-state icon `<span>` */
  checkedIcon?: string
}

export interface Props
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean
  disabled?: boolean
  withLabel?: boolean
  name?: string
  value?: string | number | boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  classes?: RadioClasses
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
      classes,
      ...rest
    } = props

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
          classes?.root,
          disabled && classes?.disabled,
          className
        )}
        style={style}
      >
        <input
          type='radio'
          className={twMerge(cx(...createInputClassNames()), classes?.input)}
          id={id}
          name={name}
          value={inputValue}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span
          className={twMerge(
            cx(...createUncheckedIconClassNames(checked)),
            classes?.uncheckedIcon
          )}
        />
        <span
          className={twMerge(
            cx(...createCheckedIconClassNames(checked)),
            classes?.checkedIcon
          )}
        />
      </span>
    )
  }
)

RadioControl.displayName = 'RadioControl'

export default RadioControl
