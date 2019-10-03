import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const UnderlineExample = () => (
  <div>
    <Container bottom='small'>
      <Typography underline>solid</Typography>
    </Container>
    <Container bottom='small'>
      <Typography underline='dashed'>dashed</Typography>
    </Container>
  </div>
)

export default UnderlineExample
