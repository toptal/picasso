import React from 'react'
import { Calendar, Container } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithWeekStartsOnSundayExample = () => {
  return (
    <Container style={{ maxWidth: '20.5rem' }}>
      <Calendar
        activeMonth={new Date(2020, 2, 2)}
        onChange={noop}
        weekStartsOn={0}
      />
    </Container>
  )
}

export default WithWeekStartsOnSundayExample
