import React from 'react'
import { Calendar, Container } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithTwoMonthsExample = () => {
  return (
    <Container>
      <Calendar
        activeMonth={new Date(2020, 2, 2)}
        onChange={noop}
        range
        numberOfMonths={2}
      />
    </Container>
  )
}

export default WithTwoMonthsExample
