import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <Typography weight='thin'>Thin</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='light'>Light</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='regular'>Regular</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='semibold'>Semibold</Typography>
    </Container>
  </div>
)

export default Example
