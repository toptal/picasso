import React from 'react'
import { format } from 'date-fns'

import ButtonCircular from '../ButtonCircular'
import Typography from '../Typography'
import { ChevronMinor24, BackMinor24 } from '../Icon'
import { MonthHeaderProps } from '../Calendar/types'
import Container from '../Container'

const CalendarMonthHeader = ({
  switchMonth,
  activeMonth: headerActiveMonth
}: MonthHeaderProps) => (
  <Container flex justifyContent='space-between' bottom='medium'>
    <ButtonCircular
      title='Previous month'
      aria-label='Previous month'
      variant='flat'
      icon={<BackMinor24 />}
      onClick={() => switchMonth(-1)}
    />

    <Typography variant='heading' size='medium'>
      {format(headerActiveMonth, 'MMMM y')}
    </Typography>
    <ButtonCircular
      title='Next month'
      aria-label='Previous month'
      variant='flat'
      icon={<ChevronMinor24 />}
      onClick={() => switchMonth(1)}
    />
  </Container>
)

export default CalendarMonthHeader
