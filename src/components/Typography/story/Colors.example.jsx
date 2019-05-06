import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const TypographyColorsExample = () => (
  <div>
    <Container bottom={1}>
      <Typography color='primary'>Primary</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='success'>Success</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='error'>Error</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='muted'>Muted</Typography>
    </Container>
    <Container bottom={1} style={{ backgroundColor: palette.primary.dark }}>
      <Typography invert>White for inverted backgrounds</Typography>
    </Container>
  </div>
)

export default TypographyColorsExample
