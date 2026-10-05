import React, { useEffect, useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import InputMask from 'react-input-mask'
import { detect } from 'detect-browser'
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

// With a time list, devices with a mouse open the list and touch devices keep their native picker
const TIME_LIST_CLASS_NAME = `${NATIVE_PICKER_CLASS_NAME} pointer-fine:[&::-webkit-calendar-picker-indicator]:hidden`

const nativePickerIcon = (
  <Time16
    classes={{
      root: 'bg-white absolute right-[0.625rem] pointer-events-none m-0 select-none',
    }}
  />
)

const getInputMask = (value?: string) => {
  const startsWithTwo = value && value[0] === '2'

  return [/[0-2]/, startsWithTwo ? /[0-3]/ : /[0-9]/, ':', /[0-5]/, /[0-9]/]
}

export const TimePicker = ({ status = 'default', ...props }: Props) => {
  const {
    onChange: externalOnChange,
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

  const isSafari = detect()?.name === 'safari'

  const {
    isOpen,
    hourCycle,
    anchorRef,
    focusListOnOpen,
    handleTriggerClick,
    handleClickAway,
    closeAndFocusField,
    handleFieldKeyDown,
  } = useTimePickerPopover({
    enabled: interactive,
    // Safari renders its own 24-hour masked field, so the list has to match it
    getHourCycle: () => (isSafari ? 24 : getHourCycle()),
  })

  const handleTimePick = (time: string) => {
    changeValue(time)
    closeAndFocusField()
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
      open={isOpen}
      anchorEl={anchorRef.current}
      onClickAway={handleClickAway}
      value={value}
      minuteStep={minuteStep}
      hourCycle={hourCycle}
      autoFocus={focusListOnOpen}
      onChange={handleTimePick}
      onClose={closeAndFocusField}
    />
  )

  const inputClassName = twMerge('cursor-default', className)
  const inputPropClassName = hasTimeList
    ? TIME_LIST_CLASS_NAME
    : NATIVE_PICKER_CLASS_NAME

  if (isSafari) {
    return (
      <>
        <Input
          type='text'
          readOnly
          {...adornmentProps}
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
              mask={getInputMask(value)}
              alwaysShowMask
              maskPlaceholder='-'
              value={value}
              onChange={onChange}
              onKeyDown={handleFieldKeyDown}
              className={'text-sm border-none p-0 m-0 outline-hidden'}
            />
          }
        />
        {timeList}
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
          onKeyDown: event => {
            rest.onKeyDown?.(event as React.KeyboardEvent<HTMLInputElement>)
            handleFieldKeyDown(event)
          },
        }}
      />
      {timeList}
    </>
  )
}

TimePicker.displayName = 'TimePicker'

export default TimePicker
