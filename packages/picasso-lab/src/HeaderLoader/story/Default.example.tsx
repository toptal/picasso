import React from 'react'
import { SkeletonLoader } from '@toptal/picasso-lab'
import { Container, Typography } from '@toptal/picasso'

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
      <SkeletonLoader.Header centered />
    </Container>
  </>
)

export default Example
