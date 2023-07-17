import React from 'react'
import { Calendar, Container } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithDisabledIntervalsExample = () => {
  return (
    <Container style={{ maxWidth: '20.5rem' }}>
      <Calendar
        activeMonth={new Date('2021-07-05')}
        onChange={noop}
        disabledIntervals={[
          { start: new Date('2021-07-11'), end: new Date('2021-07-14') },
          { start: new Date('2021-07-28'), end: new Date('2021-07-30') },
        ]}
      />
    </Container>
  )
}

export default WithDisabledIntervalsExample
