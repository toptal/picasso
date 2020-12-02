import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Typography color='light-blue'>Light Blue</Typography>
    </Container>
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
      <Typography color='yellow'>Yellow</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='light-grey'>Light Grey</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='grey'>Grey</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='dark-grey'>Dark Grey</Typography>
    </Container>
    <Container bottom={1}>
      <Typography color='black'>Black</Typography>
    </Container>
    <Container padded='xsmall' style={{ backgroundColor: palette.blue.dark }}>
      <Typography invert>White for inverted backgrounds</Typography>
    </Container>
    <Container padded='xsmall' style={{ color: palette.grey.main }}>
      <Typography color='inherit'>Inherit color</Typography>
    </Container>
  </div>
)

export default Example
