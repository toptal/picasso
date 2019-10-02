import React, { useState } from 'react'
import { ClickAwayListener } from '@toptal/picasso/utils'
import { Input, Container } from '@toptal/picasso'

import Calendar, { DateOrDateRangeType, DateRangeType } from './Calendar'

interface Props {
  range?: boolean
  onSelect: (value: DateOrDateRangeType) => void
}

export const DatePicker = ({ onSelect, range }: Props) => {
  const [calendarShown, setCalendarShown] = useState(true)

  const showCalendar = () => setCalendarShown(true)
  const hideCalendar = () => setCalendarShown(false)

  return (
    <ClickAwayListener onClickAway={hideCalendar}>
      <Container inline>
        <Input onFocus={showCalendar} />

        <Calendar
          shown={calendarShown}
          onSelect={(value: DateOrDateRangeType) => {
            if (range) {
              onSelect(value as DateRangeType)
            } else {
              onSelect(value as Date)
            }
          }}
          range={range}
        />
      </Container>
    </ClickAwayListener>
  )
}

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
