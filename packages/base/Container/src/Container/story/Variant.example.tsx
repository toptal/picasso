import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column'>
    <Container bottom={SPACING_6}>
      <Typography variant='heading' size='medium'>
        Bordered
      </Typography>

      <Container
        bordered
        rounded
        padded={SPACING_6}
        bottom={SPACING_4}
        top={SPACING_4}
      >
        White
      </Container>
    </Container>

    <Container>
      <Typography variant='heading' size='medium'>
        Non-bordered
      </Typography>

      <Container rounded padded={SPACING_6} bottom={SPACING_4} top={SPACING_4}>
        White
      </Container>
      <Container rounded variant='red' padded={SPACING_6} bottom={SPACING_4}>
        Red
      </Container>
      <Container rounded variant='yellow' padded={SPACING_6} bottom={SPACING_4}>
        Yellow
      </Container>
      <Container rounded variant='green' padded={SPACING_6} bottom={SPACING_4}>
        Green
      </Container>
      <Container rounded variant='blue' padded={SPACING_6} bottom={SPACING_4}>
        Blue
      </Container>
      <Container rounded variant='grey' padded={SPACING_6}>
        Grey
      </Container>
    </Container>
  </Container>
)

export default Example
