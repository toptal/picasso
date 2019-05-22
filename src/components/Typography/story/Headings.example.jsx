import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyHeadingsExample = () => (
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
    <Typography variant='heading' size='large'>
      Heading Large
    </Typography>
  </div>
)

export default TypographyHeadingsExample
