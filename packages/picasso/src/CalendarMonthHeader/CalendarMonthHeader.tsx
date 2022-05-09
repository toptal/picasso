import React from 'react'
import { format } from 'date-fns'

import Button from '../Button'
import Typography from '../Typography'
import { ChevronMinor24, BackMinor24 } from '../Icon'
import { MonthHeaderProps } from '../Calendar/types'
import Container from '../Container'

const CalendarMonthHeader = ({
  switchMonth,
  activeMonth: headerActiveMonth
}: MonthHeaderProps) => (
  <Container flex justifyContent='space-between' bottom='medium'>
    <Button.Circular
      title='Previous month'
      aria-label='Previous month'
      variant='flat'
      icon={<BackMinor24 />}
      onClick={() => switchMonth(-1)}
    />

    <Typography variant='heading' size='medium'>
      {format(headerActiveMonth, 'MMMM y')}
    </Typography>
    <Button.Circular
      title='Next month'
      aria-label='Previous month'
      variant='flat'
      icon={<ChevronMinor24 />}
      onClick={() => switchMonth(1)}
    />
  </Container>
)

export default CalendarMonthHeader
