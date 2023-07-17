import React from 'react'
import { Calendar, Container } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const RangeExample = () => {
  return (
    <Container style={{ maxWidth: '20.5rem' }}>
      <Calendar
        value={[new Date('2021-07-11'), new Date('2021-07-18')]}
        range
        onChange={noop}
      />
    </Container>
  )
}

export default RangeExample
