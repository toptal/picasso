import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography weight='regular'>Regular</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography weight='semibold'>Semibold</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography weight='semibold' as='div'>
        <Typography weight='inherit'>Inherit Semibold</Typography>
      </Typography>
    </Container>
  </div>
)

export default Example
