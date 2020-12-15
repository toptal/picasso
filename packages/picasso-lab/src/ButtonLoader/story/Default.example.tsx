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

    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography variant='heading'>Sizes</Typography>
      </Container>
      <Container inline>
        <SkeletonLoader.Button size='small' />
      </Container>
      <Container inline left='small'>
        <SkeletonLoader.Button size='medium' />
      </Container>
      <Container inline left='small'>
        <SkeletonLoader.Button size='large' />
      </Container>
    </Container>

    <Container bottom='medium'>
      <Container bottom='xsmall'>
        <Typography variant='heading'>Circular</Typography>
      </Container>
      <Container inline>
        <SkeletonLoader.Button circular size='small' />
      </Container>
      <Container inline left='small'>
        <SkeletonLoader.Button circular size='medium' />
      </Container>
      <Container inline left='small'>
        <SkeletonLoader.Button circular size='large' />
      </Container>
    </Container>
  </>
)

export default Example
