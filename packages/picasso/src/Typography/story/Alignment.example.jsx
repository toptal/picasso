import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyAlignmentExample = () => (
  <div>
    <Container bottom='small'>
      <Typography align='left'>Left</Typography>
    </Container>
    <Container bottom='small'>
      <Typography align='center'>Center</Typography>
    </Container>
    <Typography align='right'>Right</Typography>
  </div>
)

export default TypographyAlignmentExample
