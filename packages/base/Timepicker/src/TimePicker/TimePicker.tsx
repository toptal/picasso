import React, { useEffect, useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import InputMask from 'react-input-mask'
import { detect } from 'detect-browser'
import { Input } from '@toptal/picasso-input'
import { Time16 } from '@toptal/picasso-icons'
import type { InputProps } from '@toptal/picasso-input'
import type { Status } from '@toptal/picasso-outlined-input'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props
  extends BaseProps,
    Omit<
      InputProps,
      | 'id'
      | 'value'
      | 'onSelect'
      | 'onChange'
      | 'type'
      | 'multiline'
      | 'rows'
      | 'defaultValue'
      | 'step'
      | 'icon'
      | 'iconPosition'
      | 'counter'
      | 'endAdornment'
      | 'startAdornment'
      | 'multilineResizable'
      | 'rowsMax'
      | 'limit'
      | 'placeholder'
      | 'status'
    > {
  /** Time value that will be selected in TimePicker */
  value?: string
  /** Indicate whether `TimePicker` is in `error` or `default` state */
  status?: Extract<Status, 'error' | 'default'>
  /** Called on input change */
  onChange?: (value: string) => void
}

const VALID_TIME_REGEX = new RegExp(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)

export const TimePicker = (props: Props) => {
  const {
    onChange: externalOnChange,
    value: externalValue,
    width,
    className,
    status,
    highlight,
    ...rest
  } = props

  const [value, setValue] = useState(externalValue)

  useEffect(() => {
    // Set internal value based on the provided one if the later is correct
    if (externalValue && VALID_TIME_REGEX.test(externalValue)) {
      setValue(externalValue)
    }
  }, [externalValue])

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const newValue = event.target.value

    setValue(newValue)

    if (newValue && VALID_TIME_REGEX.test(newValue)) {
      externalOnChange?.(newValue)
    } else {
      externalOnChange?.('')
    }
  }

  const browser = detect()
  const isSafari = browser?.name === 'safari'
  const startsWithTwo = value && value[0] === '2'

  const inputMask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/,
  ]

  const icon = (
    <Time16
      classes={{
        root: 'bg-white absolute right-[0.625rem] pointer-events-none m-0 select-none',
      }}
    />
  )

  const inputClassName = twMerge('cursor-default', className)

  const inputPropClassName = `-mr-[8px] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2
    [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-none`

  if (isSafari) {
    return (
      <Input
        type='text'
        readOnly
        iconPosition='end'
        icon={icon}
        width={width}
        status={status}
        className={inputClassName}
        highlight={highlight}
        inputProps={{
          className: inputPropClassName,
          ...rest,
        }}
        startAdornment={
          <InputMask
            mask={inputMask}
            alwaysShowMask
            maskPlaceholder='-'
            value={value}
            onChange={onChange}
            className={'text-sm border-none p-0 m-0 outline-none'}
          />
        }
      />
    )
  }

  return (
    <Input
      type='time'
      value={value}
      className={inputClassName}
      onChange={onChange}
      iconPosition='end'
      highlight={highlight}
      icon={icon}
      width={width}
      status={status}
      inputProps={{
        className: inputPropClassName,
        step: 60, // 1 min
        ...rest,
      }}
    />
  )
}

TimePicker.defaultProps = {
  status: 'default',
}

TimePicker.displayName = 'TimePicker'

export default TimePicker
