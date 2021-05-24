import React from 'react'
import { SkeletonLoader, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <>
    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>Default alignment</Typography>
      </Container>
      <SkeletonLoader.Header />
    </Container>

    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>Centered</Typography>
      </Container>
      <Container flex justifyContent='center'>
        <SkeletonLoader.Header />
      </Container>
    </Container>
  </>
)

export default Example
