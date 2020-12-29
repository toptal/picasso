import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <Typography variant='heading' size='small'>
        Heading Small
      </Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='heading' size='medium'>
        Heading Medium
      </Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='heading' size='large'>
        Heading Large
      </Typography>
    </Container>
    <Typography variant='heading' size='xlarge'>
      Heading Extra Large
    </Typography>
  </div>
)

export default Example
