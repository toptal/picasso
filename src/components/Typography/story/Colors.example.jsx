import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const TypographyColorsExample = () => (
  <div>
    <Container bottom={1}>
      <Typography color='blue'>Blue</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='green'>Green</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='red'>Red</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='grey'>Grey</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='black'>Black</Typography>
    </Container>
    <Container
      padded='xsmall'
      style={{ backgroundColor: palette.primary.dark }}
    >
      <Typography invert>White for inverted backgrounds</Typography>
    </Container>
  </div>
)

export default TypographyColorsExample
