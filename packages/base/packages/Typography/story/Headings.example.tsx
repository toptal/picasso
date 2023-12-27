import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='small'>
        Heading Small
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Heading Medium
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
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
