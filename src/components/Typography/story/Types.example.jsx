import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyTypesExample = () => (
  <div>
    <Container bottom='small'>
      <Typography variant='large'>Large paragraph</Typography>
    </Container>
    <Container bottom='small'>
      <Typography>Paragraph</Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='small'>Small paragraph</Typography>
    </Container>
    <Typography variant='caption'>Caption</Typography>
  </div>
)

export default TypographyTypesExample
