import React from 'react'
import { format } from 'date-fns'

import Button from '../Button'
import Typography from '../Typography'
import { BackMinor16, ChevronMinor16 } from '../Icon'
import { MonthHeaderProps } from '../Calendar/types'
import Container from '../Container'

const CalendarMonthHeader = ({
  switchMonth,
  activeMonth: headerActiveMonth
}: MonthHeaderProps) => (
  <Container flex justifyContent='space-between' bottom='medium'>
    <Button
      title='Previous month'
      variant='secondary'
      size='small'
      onClick={() => switchMonth(-1)}
    >
      <BackMinor16 />
    </Button>
    <Typography variant='heading' size='medium'>
      {format(headerActiveMonth, 'MMMM y')}
    </Typography>
    <Button
      title='Next month'
      variant='secondary'
      size='small'
      onClick={() => switchMonth(1)}
    >
      <ChevronMinor16 />
    </Button>
  </Container>
)

export default CalendarMonthHeader
