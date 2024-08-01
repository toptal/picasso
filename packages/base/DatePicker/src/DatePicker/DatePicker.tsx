/* eslint-disable max-lines-per-function, max-lines */
/* eslint-disable complexity, max-statements */ // Squiggly lines makes code difficult to work with
import type { BaseProps } from '@toptal/picasso-shared'
import formatDate from 'date-fns/format'
import type PopperJs from 'popper.js'
import type { KeyboardEvent, ReactNode } from 'react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Calendar16 } from '@toptal/picasso-icons'
import { Popper } from '@toptal/picasso-popper'
import { Container } from '@toptal/picasso-container'
import { Input } from '@toptal/picasso-input'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import {
  ClickAwayListener,
  noop,
  usePropDeprecationWarning,
} from '@toptal/picasso-utils'
import { Calendar } from '@toptal/picasso-calendar'
import type {
  CalendarDateRange,
  DateOrDateRangeType,
  DateRangeType,
  WeekStart,
  CalendarMonthsAmount,
  RenderDay,
} from '@toptal/picasso-calendar'
import type { InputProps } from '@toptal/picasso-input'
import type { Status } from '@toptal/picasso-outlined-input'

import {
  DEFAULT_DATE_PICKER_DISPLAY_DATE_FORMAT,
  DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT,
  POPPER_OPTIONS,
} from './constants'
import type { DatePickerValue, DatePickerInputCustomValueParser } from './types'
import {
  formatDateRange,
  datePickerParseDateString,
  timezoneConvert,
  timezoneFormat,
  getStartOfTheDayDate,
} from './utils'

const EMPTY_INPUT_VALUE = ''

export interface Props
  extends BaseProps,
    Omit<
      InputProps,
      | 'value'
      | 'onSelect'
      | 'type'
      | 'multiline'
      | 'rows'
      | 'defaultValue'
      | 'onChange'
      | 'testIds'
    > {
  /** Date that will be selected in `DatePicker` */
  value?: DatePickerValue
  /** Method that will be invoked with selected values */
  onChange: (value: DatePickerValue) => void
  /** Invoked when user goes away from `DatePicker` input */
  onBlur?: () => void
  /** Whether calendar supports single date selection or range */
  range?: boolean
  /** Earliest date available for selection */
  minDate?: Date
  /** Latest date available for selection */
  maxDate?: Date
  /** Whether calendar should be closed after date selection. True by default */
  hideOnSelect?: boolean
  /** Date format that user will see in the input */
  displayDateFormat?: string
  /** Date range where selection is not allowed */
  disabledIntervals?: CalendarDateRange[]
  /** Date format that user will see during manual input */
  editDateFormat?: string
  /** Specify icon which should be rendered inside `DatePicker` */
  icon?: ReactNode
  /** Specify a value if want to enable browser autofill */
  autoComplete?: string
  /**
   * @deprecated [FX-4715] Use the `status` prop instead to both support success and error states
   * Indicate whether `DatePicker` is in error state
   */
  error?: boolean
  /** Indicate `DatePicker` status */
  status?: Status
  /** Function to override default markup to show Date */
  renderDay?: RenderDay
  popperContainer?: HTMLElement
  /** Index of the first day of the week (0 - Sunday). Default is 1 - Monday */
  weekStartsOn?: WeekStart
  /** IANA timezone to display and edit date(s) */
  timezone?: string
  /** Custom parser for `DatePicker`'s input value to process custom input value, like, human-readable dates */
  parseInputValue?: DatePickerInputCustomValueParser
  /** Additional data-* attrs for the inner Popper */
  popperProps?: {
    [key: `data-${string}`]: unknown
  }
  testIds?: InputProps['testIds'] & {
    calendar?: string
    input?: string
  }
  /** Adds a customized footer at the bottom of the calendar */
  footer?: ReactNode
  /** Change the footer background color */
  footerBackgroundColor?: string
  /** Shows orange dot indicator in days between a date range */
  indicatedIntervals?: CalendarDateRange[]
  highlight?: 'autofill'
  /** Display more than one month at the same time */
  numberOfMonths?: CalendarMonthsAmount
  /** Display dropdown navigation between months and years (requires minDate and maxDate to be set) */
  dropdownNavigation?: boolean
}

export const DatePicker = (props: Props) => {
  const {
    range,
    hideOnSelect,
    displayDateFormat = DEFAULT_DATE_PICKER_DISPLAY_DATE_FORMAT,
    editDateFormat = DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT,
    onBlur = noop,
    onChange,
    onResetClick,
    value,
    width,
    icon,
    minDate,
    maxDate,
    disabledIntervals,
    popperContainer,
    renderDay,
    weekStartsOn,
    timezone,
    size,
    parseInputValue,
    testIds,
    error,
    status,
    popperProps,
    disabled,
    footer,
    indicatedIntervals,
    footerBackgroundColor,
    highlight,
    numberOfMonths = 1,
    dropdownNavigation,
    ...rest
  } = props

  // TODO: [FX-4715]
  usePropDeprecationWarning({
    props,
    name: 'error',
    componentName: 'DatePicker',
    description:
      'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
  })

  const inputProps = rest

  const [calendarIsShown, setCalendarIsShown] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState(EMPTY_INPUT_VALUE)
  const [calendarValue, setCalendarValue] =
    useState<DateOrDateRangeType | null>(null)

  const [normalizedMinDate, normalizedMaxDate] = useMemo(() => {
    return [getStartOfTheDayDate(minDate), getStartOfTheDayDate(maxDate)]
  }, [minDate, maxDate])

  const hideCalendar = () => setCalendarIsShown(false)
  const showCalendar = () => setCalendarIsShown(true)

  const inputRef = useRef<HTMLInputElement>(null)
  const popperRef = useRef<PopperJs>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputWrapperRef = useRef<HTMLDivElement>(null)

  // Active (visible) month of the calendar that required for manual entering of
  // a single date
  const activeMonth = calendarValue instanceof Date ? calendarValue : undefined

  // Format the input based on its 'focus' state
  const formatInputValue = useCallback(
    (valueToFormat: DateOrDateRangeType) => {
      return Array.isArray(valueToFormat)
        ? formatDateRange(valueToFormat as DateRangeType, displayDateFormat)
        : formatDate(
            valueToFormat as Date,
            isInputFocused ? editDateFormat : displayDateFormat
          )
    },
    [isInputFocused, editDateFormat, displayDateFormat]
  )

  const updateInputValue = useCallback(
    ({ preventUpdateOnFocus }: { preventUpdateOnFocus?: boolean }) => {
      if (preventUpdateOnFocus && isInputFocused) {
        return
      }

      setInputValue(() => {
        if (!value) {
          return EMPTY_INPUT_VALUE
        }

        return formatInputValue(timezoneConvert(value, timezone))
      })
    },
    [value, isInputFocused, timezone, formatInputValue]
  )

  // Keep the input value in sync with date value update
  // Updating on incoming date value or timezone change
  // Should not update when input is focused to prevent overriding it's value
  useEffect(() => {
    updateInputValue({ preventUpdateOnFocus: true })
  }, [value, timezone])

  // Keep the input format in sync with its 'focus' state
  // Updating on input focus state change
  useEffect(() => {
    updateInputValue({ preventUpdateOnFocus: false })
  }, [isInputFocused])

  useEffect(() => {
    if (disabled) {
      setIsInputFocused(false)
    }
  }, [disabled])

  // Keep the calendar in sync with the input value
  useEffect(() => {
    setCalendarValue(() => {
      if (!value) {
        return null
      }

      return timezoneConvert(value, timezone)
    })
  }, [value, timezone])

  const isInsideDatePicker = (node: Node) => {
    return (
      popperRef.current?.popper.contains(node) ||
      inputWrapperRef.current?.contains(node)
    )
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const isFocusedInsideDatePicker = isInsideDatePicker(
      (event.relatedTarget || document.activeElement) as Node
    )

    if (isFocusedInsideDatePicker) {
      return
    }

    hideCalendar()
    onBlur()

    setIsInputFocused(false)
  }

  const handleCalendarClickOutside = (
    event: React.MouseEvent<unknown, unknown>
  ) => {
    if (!isInsideDatePicker(event.target as Node)) {
      hideCalendar()
      setIsInputFocused(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const nextValue = e.target.value

    // TODO: change this if manual entering of range is needed
    if (range && nextValue) {
      return
    }

    // TODO: add char filtering (only number , `-` or ` ` allowed) in case if `parseInputValue` is not set
    setInputValue(nextValue)

    if (!nextValue) {
      return onChange(null)
    }

    const parsedInputDate = datePickerParseDateString(nextValue, {
      customParser: parseInputValue,
      dateFormat: editDateFormat,
      timezone,
      minDate: normalizedMinDate,
      maxDate: normalizedMaxDate,
    })

    if (parsedInputDate) {
      onChange(parsedInputDate)
    }
  }

  const focus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleCalendarChange = (nextValue: DateOrDateRangeType) => {
    const nextTimezoneValue = Array.isArray(nextValue)
      ? (nextValue.map((date: Date) =>
          timezoneFormat(date, timezone)
        ) as DateRangeType)
      : timezoneFormat(nextValue, timezone)

    onChange(nextTimezoneValue)
    setInputValue(formatInputValue(nextValue))
    setCalendarValue(nextValue)

    if (hideOnSelect) {
      focus()
      hideCalendar()
    }
  }

  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key

    if (key === 'Escape') {
      hideCalendar()
      event.currentTarget.blur()

      return
    }

    if (key === 'Enter') {
      if (!calendarIsShown) {
        showCalendar()
      } else {
        hideCalendar()
      }

      return
    }

    if (key === 'Tab' && calendarIsShown) {
      event.preventDefault()
      event.stopPropagation()

      if (!calendarIsShown) {
        event.currentTarget.blur()
      } else {
        const firstButton =
          calendarRef.current?.querySelector<HTMLButtonElement>(
            'button:not([tabindex="-1"])'
          )

        if (firstButton) {
          firstButton.focus()
        }
      }
    }
  }

  const handleClick: React.MouseEventHandler<HTMLInputElement> = event => {
    if (disabled) {
      return
    }

    inputProps?.onClick?.(event)
    showCalendar()
    setIsInputFocused(true)
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    if (disabled) {
      return
    }

    inputProps?.onFocus?.(event)
    showCalendar()
    setIsInputFocused(true)
  }

  const handleResetClick = (
    event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => {
    setInputValue(EMPTY_INPUT_VALUE)
    onResetClick?.(event)

    // prevent re-opening the calendar popper
    event.stopPropagation()
  }

  const startAdornment =
    size !== 'small' ? (
      <InputAdornment position='start' disablePointerEvents>
        {icon || <Calendar16 />}
      </InputAdornment>
    ) : undefined

  return (
    <>
      <Container inline={width !== 'full'} ref={inputWrapperRef}>
        <Input
          {...inputProps}
          status={error ? 'error' : status}
          disabled={disabled}
          ref={inputRef}
          onKeyDown={handleInputKeydown}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleInputBlur}
          onResetClick={handleResetClick}
          value={inputValue}
          onChange={handleInputChange}
          size={size}
          startAdornment={startAdornment}
          width={width}
          testIds={testIds}
          data-testid={testIds?.input}
          highlight={highlight}
        />
      </Container>
      {inputWrapperRef.current && (
        <Popper
          placement='bottom-start'
          open={calendarIsShown}
          anchorEl={inputWrapperRef.current}
          autoWidth={false}
          enableCompactMode
          container={popperContainer}
          popperOptions={POPPER_OPTIONS}
          ref={popperRef}
          {...popperProps}
        >
          <ClickAwayListener onClickAway={handleCalendarClickOutside}>
            <div>
              <Calendar
                activeMonth={activeMonth}
                data-testid={testIds?.calendar}
                ref={calendarRef}
                range={range}
                value={calendarValue ?? undefined}
                minDate={normalizedMinDate}
                maxDate={normalizedMaxDate}
                disabledIntervals={disabledIntervals}
                indicatedIntervals={indicatedIntervals}
                renderDay={renderDay}
                onChange={handleCalendarChange}
                className={'outline-none'}
                hasFooter={Boolean(footer)}
                weekStartsOn={weekStartsOn}
                numberOfMonths={numberOfMonths}
                dropdownNavigation={dropdownNavigation}
              />
              {footer && (
                <div
                  className={
                    'bg-gray-50 shadow-5 rounded-t-none rounded-b-sm py-[0.625rem] px-[1.187rem] w-[20.5rem]'
                  }
                  style={{ backgroundColor: footerBackgroundColor }}
                >
                  {footer}
                </div>
              )}
            </div>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  )
}

DatePicker.defaultProps = {
  range: false,
  hideOnSelect: true,
  onBlur: noop,
  editDateFormat: 'MM-dd-yyyy',
  displayDateFormat: 'MMM d, yyyy',
  autoComplete: 'off',
  status: 'default',
  numberOfMonths: 1,
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
