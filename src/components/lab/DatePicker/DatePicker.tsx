import React, { useState } from 'react'

import { ClickAwayListener } from '../../utils'
import { Input, Container } from '../..'
import Calendar, { DateOrDateRangeType, DateRangeType } from '../Calendar'

interface Props {
  range?: boolean
  onSelect: (value: DateOrDateRangeType) => void
}

export const DatePicker = ({ onSelect, range }: Props) => {
  const [calendarOpened, setCalendarOpened] = useState(false)

  const openCalendar = () => setCalendarOpened(true)
  const closeCalendar = () => setCalendarOpened(false)

  const handleSelect = (value: DateOrDateRangeType) => {
    if (range) {
      onSelect(value as DateRangeType)
    } else {
      onSelect(value as Date)
    }
  }

  return (
    <ClickAwayListener onClickAway={closeCalendar}>
      <Container inline>
        <Input onFocus={openCalendar} />

        <Calendar open={calendarOpened} onSelect={handleSelect} range={range} />
      </Container>
    </ClickAwayListener>
  )
}

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
