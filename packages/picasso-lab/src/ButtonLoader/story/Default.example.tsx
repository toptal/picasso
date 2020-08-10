import React from 'react'
import { SkeletonLoader } from '@toptal/picasso-lab'
import { Container, Typography } from '@toptal/picasso'

const Example = () => (
  <>
    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>Default</Typography>
      </Container>
      <SkeletonLoader.Button />
    </Container>

    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>Align center</Typography>
      </Container>

      <Container flex justifyContent='center'>
        <SkeletonLoader.Button />
      </Container>
    </Container>

    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography>Align right</Typography>
      </Container>

      <Container flex justifyContent='flex-end'>
        <SkeletonLoader.Button />
      </Container>
    </Container>
  </>
)

export default Example
