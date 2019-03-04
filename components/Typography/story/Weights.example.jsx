import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyWeightsExample = () => (
  <div>
    <Container bottom={1}>
      <Typography weight='thin'>Thin</Typography>
    </Container>
    <Container bottom={1}>
      <Typography weight='light'>Light</Typography>
    </Container>
    <Container bottom={1}>
      <Typography weight='regular'>Regular</Typography>
    </Container>
    <Container bottom={1}>
      <Typography weight='semibold'>Semibold</Typography>
    </Container>
    <Typography weight='bold'>Bold</Typography>
  </div>
)

export default TypographyWeightsExample
