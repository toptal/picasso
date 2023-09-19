import React from 'react'
import { SkeletonLoader, Typography, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_2 } from '@toptal/picasso/utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>One row</Typography>
      </Container>
      <SkeletonLoader.Typography />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Two rows</Typography>
      </Container>
      <SkeletonLoader.Typography rows={2} />
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_2}>
        <Typography>Three rows</Typography>
      </Container>
      <SkeletonLoader.Typography rows={3} />
    </Container>
  </>
)

export default Example
