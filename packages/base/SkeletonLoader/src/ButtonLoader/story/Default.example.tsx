import React from 'react'
import { SkeletonLoader, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Default</Typography>
      </Container>
      <SkeletonLoader.Button />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Align center</Typography>
      </Container>

      <Container flex justifyContent='center'>
        <SkeletonLoader.Button />
      </Container>
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Align right</Typography>
      </Container>

      <Container flex justifyContent='flex-end'>
        <SkeletonLoader.Button />
      </Container>
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography variant='heading'>Sizes</Typography>
      </Container>
      <Container inline>
        <SkeletonLoader.Button size='small' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button size='medium' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button size='large' />
      </Container>
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography variant='heading'>Circular</Typography>
      </Container>
      <Container inline>
        <SkeletonLoader.Button circular size='small' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button circular size='medium' />
      </Container>
      <Container inline left={SPACING_4}>
        <SkeletonLoader.Button circular size='large' />
      </Container>
    </Container>
  </>
)

export default Example
