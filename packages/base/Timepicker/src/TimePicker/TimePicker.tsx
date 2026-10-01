import React, { useEffect, useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import InputMask from 'react-input-mask'
import { detect } from 'detect-browser'
import { Input } from '@toptal/picasso-input'
import { Popper } from '@toptal/picasso-popper'
import { ClickAwayListener } from '@toptal/picasso-utils'
import type { InputProps } from '@toptal/picasso-input'
import type { Status } from '@toptal/picasso-outlined-input'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TimePickerColumns } from '../TimePickerColumns'
import { TimePickerTrigger } from '../TimePickerTrigger'
import { useTimePickerPopover } from './use-time-picker-popover'
import {
  VALID_TIME_REGEX,
  formatTime,
  getCurrentTime,
  getHourCycle,
  parseTime,
} from './utils'
import type { Time } from './utils'

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
  /** Indicate whether `TimePicker` is in `error`, `warning` or `default` state */
  status?: Extract<Status, 'error' | 'warning' | 'default'>
  /** Called on input change */
  onChange?: (value: string) => void
  /** Label of the hour column in the time dropdown */
  hourLabel?: string
  /** Label of the minute column in the time dropdown */
  minuteLabel?: string
}

const POPPER_OPTIONS = {
  modifiers: {
    offset: { offset: '0, 4' },
  },
}

export const TimePicker = ({
  status = 'default',
  hourLabel = 'Hour',
  minuteLabel = 'Minute',
  ...props
}: Props) => {
  const {
    onChange: externalOnChange,
    value: externalValue,
    width,
    className,
    highlight,
    size,
    ...rest
  } = props

  const [value, setValue] = useState(externalValue)
  const isInteractive = !rest.disabled && !rest.readOnly

  useEffect(() => {
    // Set internal value based on the provided one if the later is correct
    if (externalValue && VALID_TIME_REGEX.test(externalValue)) {
      setValue(externalValue)
    }
  }, [externalValue])

  const changeValue = (newValue: string) => {
    setValue(newValue)

    if (newValue && VALID_TIME_REGEX.test(newValue)) {
      externalOnChange?.(newValue)
    } else {
      externalOnChange?.('')
    }
  }

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => changeValue(event.target.value)

  const browser = detect()
  const isSafari = browser?.name === 'safari'

  const {
    isOpen,
    hourCycle,
    anchorRef,
    focusColumnsOnOpen,
    handleTriggerClick,
    handleClickAway,
    handleColumnsClose,
    handleFieldKeyDown,
  } = useTimePickerPopover({
    value,
    isInteractive,
    // Safari renders its own 24-hour masked field, so the columns have to match it
    getHourCycle: () => (isSafari ? 24 : getHourCycle()),
    onChange: changeValue,
  })
  const startsWithTwo = value && value[0] === '2'

  const inputMask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/,
  ]

  const trigger = (
    <TimePickerTrigger
      open={isOpen}
      disabled={!isInteractive}
      onClick={handleTriggerClick}
    />
  )

  const popover = isOpen && anchorRef.current && (
    <Popper
      open
      role='dialog'
      aria-label='Choose time'
      anchorEl={anchorRef.current}
      placement='bottom-start'
      autoWidth={false}
      popperOptions={POPPER_OPTIONS}
      className='xs:max-md:w-auto xs:max-md:max-w-none'
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <TimePickerColumns
            time={parseTime(value) ?? getCurrentTime()}
            hourCycle={hourCycle}
            hourLabel={hourLabel}
            minuteLabel={minuteLabel}
            autoFocus={focusColumnsOnOpen}
            onChange={(time: Time) => changeValue(formatTime(time))}
            onClose={handleColumnsClose}
          />
        </div>
      </ClickAwayListener>
    </Popper>
  )

  const inputClassName = twMerge('cursor-default', className)

  const inputPropClassName = `-mr-[8px] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2
    [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-none
    pointer-fine:[&::-webkit-calendar-picker-indicator]:hidden`

  if (isSafari) {
    return (
      <>
        <Input
          type='text'
          readOnly
          endAdornment={trigger}
          width={width}
          status={status}
          className={inputClassName}
          highlight={highlight}
          size={size}
          outlineRef={anchorRef}
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
              onKeyDown={handleFieldKeyDown}
              className={'text-sm border-none p-0 m-0 outline-hidden'}
            />
          }
        />
        {popover}
      </>
    )
  }

  return (
    <>
      <Input
        type='time'
        value={value}
        className={inputClassName}
        onChange={onChange}
        endAdornment={trigger}
        highlight={highlight}
        width={width}
        size={size}
        status={status}
        outlineRef={anchorRef}
        inputProps={{
          className: inputPropClassName,
          step: 60, // 1 min
          ...rest,
          onKeyDown: event => {
            rest.onKeyDown?.(event as React.KeyboardEvent<HTMLInputElement>)
            handleFieldKeyDown(event)
          },
        }}
      />
      {popover}
    </>
  )
}

TimePicker.displayName = 'TimePicker'

export default TimePicker
