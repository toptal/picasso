import React from 'react'
import { SkeletonLoader } from '@toptal/picasso-lab'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <>
    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>One row</Typography>
      </Container>
      <SkeletonLoader.Typography />
    </Container>

    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>Two rows</Typography>
      </Container>
      <SkeletonLoader.Typography rows={2} />
    </Container>

    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>Three rows</Typography>
      </Container>
      <SkeletonLoader.Typography rows={3} />
    </Container>
  </>
)

export default Example
