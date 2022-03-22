import React from 'react'
import { Container, TimePicker, Typography } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography>Default</Typography>
        <TimePicker status='default' />
      </Container>
      <Container padded='small'>
        <Typography>Error</Typography>
        <TimePicker status='error' />
      </Container>
    </Container>
  )
}

export default Example
