import React, { useState } from 'react'
import format from 'date-fns/format'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Input } from '@toptal/picasso-core'
import { Props as InputProps } from '@toptal/picasso-core/src/Input'
// --- think how to fix this path without 'src'
import { ClickAwayListener } from '@toptal/picasso-core/src/utils'

import Calendar, { DateOrDateRangeType, DateRangeType } from '../Calendar'

export interface Props
  extends BaseProps,
    Omit<
      InputProps,
      | 'value'
      | 'onSelect'
      | 'type'
      | 'autoComplete'
      | 'multiline'
      | 'rows'
      | 'defaultValue'
      | 'onChange'
    > {
  /** Method that will be invoked with selected values */
  onChange: (value: DateOrDateRangeType) => void
  /** Whether calendar supports single date selection or range */
  range?: boolean
  /** Initial value */
  value?: Date
}

function isDateRange(value: DateOrDateRangeType): value is DateRangeType {
  return Array.isArray(value)
}

const formatDate = (date: Date) => format(date, 'MMM d, yyyy')
const formatDateRange = (dates: DateRangeType) =>
  dates.map(formatDate).join(' - ')

const formatValue = (value: DateOrDateRangeType) => {
  if (isDateRange(value)) {
    return formatDateRange(value)
  } else {
    return formatDate(value)
  }
}

export const DatePicker = ({
  onChange,
  range,
  value: initialValue,
  width,
  ...rest
}: Props) => {
  const [calendarOpened, setCalendarOpened] = useState(false)
  const [inputValue, setInputValue] = useState<string | undefined>(
    initialValue ? formatValue(initialValue) : undefined
  )

  const openCalendar = () => setCalendarOpened(true)
  const closeCalendar = () => setCalendarOpened(false)

  const handleSelect = (value: DateOrDateRangeType) => {
    setInputValue(formatValue(value))
    onChange(value)
  }

  return (
    <ClickAwayListener onClickAway={closeCalendar}>
      <Container inline={width !== 'full'}>
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          value={inputValue}
          onFocus={openCalendar}
          width={width}
        />
        <Calendar
          activeMonth={initialValue}
          value={initialValue}
          open={calendarOpened}
          onChange={handleSelect}
          range={range}
        />
      </Container>
    </ClickAwayListener>
  )
}

DatePicker.defaultProps = {
  range: false
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
