import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyTypesExample = () => (
  <div>
    <Container bottom={1}>
      <Typography variant='large'>Large paragraph</Typography>
    </Container>
    <Container bottom={1}>
      <Typography>Paragdsdsraph</Typography>
    </Container>
    <Container bottom={1}>
      <Typography variant='small'>Small paragraph</Typography>
    </Container>
    <Typography variant='caption'>Caption</Typography>
  </div>
)

export default TypographyTypesExample
