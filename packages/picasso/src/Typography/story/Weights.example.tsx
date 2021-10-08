import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <Typography weight='regular'>Regular</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='semibold'>Semibold</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='semibold' as='div'>
        <Typography weight='inherit'>Inherit Semibold</Typography>
      </Typography>
    </Container>
  </div>
)

export default Example
