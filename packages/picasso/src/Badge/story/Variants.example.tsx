import React from 'react'
import { Container, Typography, Badge } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        White:
      </Typography>
    </Container>
    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Badge content={1} variant='white' />
      <Badge content={0} variant='white' />
    </Container>

    <Container top={SPACING_6}>
      <Typography variant='heading' size='small'>
        Red:
      </Typography>
    </Container>
    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Badge content={100} variant='red' />
      <Badge content={1} variant='red' />
    </Container>
  </>
)

export default Example
