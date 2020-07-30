import React from 'react'
import { SkeletonLoader } from '@toptal/picasso-lab'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <>
    <Container bottom='medium'>
      <Typography>One row (default)</Typography>
      <SkeletonLoader />
    </Container>

    <Container bottom='medium'>
      <Typography>Two rows</Typography>
      <SkeletonLoader rows={2} />
    </Container>

    <Typography>Three rows</Typography>
    <SkeletonLoader rows={3} />
  </>
)

export default Example
