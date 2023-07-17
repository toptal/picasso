import React, { useState } from 'react'
import type { DateOrDateRangeType } from '@toptal/picasso'
import { Calendar, Container } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = useState<DateOrDateRangeType>(
    new Date('2021-07-09')
  )

  return (
    <Container style={{ maxWidth: '20.5rem' }}>
      <Calendar value={value} onChange={setValue} />
    </Container>
  )
}

export default DefaultExample
