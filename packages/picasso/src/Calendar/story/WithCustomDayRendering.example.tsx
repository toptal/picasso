import React from 'react'
import { Calendar, Tooltip, Container } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithCustomDayRenderingExample = () => {
  return (
    <Container style={{ maxWidth: '20.5rem' }}>
      <Calendar
        value={new Date('2021-07-11')}
        onChange={noop}
        renderDay={({ children }) => {
          return <Tooltip content='Message in tooltip'>{children}</Tooltip>
        }}
      />
    </Container>
  )
}

export default WithCustomDayRenderingExample
