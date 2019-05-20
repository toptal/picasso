import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyHeadingsExample = () => (
  <div>
    <Container bottom='small'>
      <Typography variant='header' size='small'>
        Heading Small
      </Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='header'>Heading Medium</Typography>
    </Container>
    <Typography variant='header' size='large'>
      Heading Large
    </Typography>
  </div>
)

export default TypographyHeadingsExample
