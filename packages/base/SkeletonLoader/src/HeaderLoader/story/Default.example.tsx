import React from 'react'
import { SkeletonLoader, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_2 } from '@toptal/picasso/utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Default alignment</Typography>
      </Container>
      <SkeletonLoader.Header />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Centered</Typography>
      </Container>
      <Container flex justifyContent='center'>
        <SkeletonLoader.Header />
      </Container>
    </Container>
  </>
)

export default Example
