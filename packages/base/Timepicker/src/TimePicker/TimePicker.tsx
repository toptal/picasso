import React, { useEffect, useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Input } from '@toptal/picasso-input'
import { Time16 } from '@toptal/picasso-icons'
import type { InputProps } from '@toptal/picasso-input'
import type { Status } from '@toptal/picasso-outlined-input'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TimePickerDropdown } from '../TimePickerDropdown'
import { TimePickerTrigger } from '../TimePickerTrigger'
import { useTimePickerPopover } from './use-time-picker-popover'
import { VALID_TIME_REGEX, getHourCycle } from './utils'

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
  /** Interval in minutes between the times offered in a dropdown list. When omitted, the browser's own time picker is used */
  minuteStep?: 5 | 10 | 15 | 20 | 30 | 60
}

const NATIVE_PICKER_CLASS_NAME = `-mr-2 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2
    [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-none`

const TIME_LIST_CLASS_NAME = `${NATIVE_PICKER_CLASS_NAME} pointer-fine:[&::-webkit-calendar-picker-indicator]:hidden`

const nativePickerIcon = (
  <Time16
    classes={{
      root: 'bg-white absolute right-[0.625rem] pointer-events-none m-0 select-none',
    }}
  />
)

export const TimePicker = ({
  status = 'default',
  ...props
}: Props): React.ReactElement => {
  const {
    onChange: externalOnChange,
    onKeyDown: externalOnKeyDown,
    onBlur: externalOnBlur,
    onFocus: externalOnFocus,
    value: externalValue,
    width,
    className,
    highlight,
    size,
    minuteStep,
    ...rest
  } = props

  const [value, setValue] = useState(externalValue)
  const hasTimeList = minuteStep !== undefined
  const interactive = hasTimeList && !rest.disabled && !rest.readOnly

  useEffect(() => {
    // Set internal value based on the provided one if the later is correct
    if (externalValue && VALID_TIME_REGEX.test(externalValue)) {
      setValue(externalValue)

      return
    }

    // Cleared from outside, such as a form reset. The '' this component
    // reports for an incomplete time must not clear it: a text field, where
    // a browser has no time input, still shows it, and an empty picker stays
    // uncontrolled
    if (!externalValue) {
      setValue(current =>
        current && VALID_TIME_REGEX.test(current) ? '' : current
      )
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

  const {
    isOpen,
    hourCycle,
    anchorRef,
    listRef,
    focusList,
    isFocusChangeWithinList,
    handleTriggerClick,
    handleClickAway,
    closeAndFocusField,
    handleFieldFocus,
    handleFieldKeyDown,
  } = useTimePickerPopover({
    enabled: interactive,
    getHourCycle,
  })

  const handleTimePick = (time: string) => {
    changeValue(time)
    closeAndFocusField()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    externalOnKeyDown?.(event)
    handleFieldKeyDown(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isFocusChangeWithinList(event)) {
      externalOnBlur?.(event)
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    handleFieldFocus()

    if (!isFocusChangeWithinList(event)) {
      externalOnFocus?.(event)
    }
  }

  const adornmentProps = hasTimeList
    ? {
        endAdornment: (
          <TimePickerTrigger
            open={isOpen}
            disabled={!interactive}
            onClick={handleTriggerClick}
          />
        ),
      }
    : { iconPosition: 'end' as const, icon: nativePickerIcon }

  const timeList = hasTimeList && (
    <TimePickerDropdown
      ref={listRef}
      open={isOpen}
      anchorEl={anchorRef.current}
      onClickAway={handleClickAway}
      value={value}
      minuteStep={minuteStep}
      hourCycle={hourCycle}
      autoFocus={focusList}
      onChange={handleTimePick}
      onClose={closeAndFocusField}
    />
  )

  const inputClassName = twMerge('cursor-default', className)
  const inputPropClassName = hasTimeList
    ? TIME_LIST_CLASS_NAME
    : NATIVE_PICKER_CLASS_NAME

  return (
    <>
      <Input
        type='time'
        value={value}
        className={inputClassName}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...adornmentProps}
        highlight={highlight}
        width={width}
        size={size}
        status={status}
        outlineRef={anchorRef}
        inputProps={{
          className: inputPropClassName,
          step: 60, // 1 min
          ...rest,
        }}
      />
      {timeList}
    </>
  )
}

TimePicker.displayName = 'TimePicker'

export default TimePicker
