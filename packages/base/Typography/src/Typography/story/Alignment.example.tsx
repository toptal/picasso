import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography align='left'>Left</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography align='center'>Center</Typography>
    </Container>
    <Typography align='right'>Right</Typography>
  </div>
)

export default Example
