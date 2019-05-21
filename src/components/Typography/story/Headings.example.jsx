import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyHeadingsExample = () => (
  <div>
    <Container bottom='small'>
      <Typography variant='heading' size='small' color='black'>
        Heading Small
      </Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='heading' color='black'>
        Heading Medium
      </Typography>
    </Container>
    <Typography variant='heading' size='large' color='black'>
      Heading Large
    </Typography>
  </div>
)

export default TypographyHeadingsExample
