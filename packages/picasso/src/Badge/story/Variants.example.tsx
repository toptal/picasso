import React from 'react'
import { Container, Typography, Badge } from '@toptal/picasso'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        White:
      </Typography>
    </Container>
    <Container top='small'>
      <Container inline right='small'>
        <Badge content={1} variant='white' />
      </Container>

      <Container inline right='small'>
        <Badge content={0} variant='white' />
      </Container>
    </Container>

    <Container top='medium'>
      <Typography variant='heading' size='small'>
        Red:
      </Typography>
    </Container>
    <Container top='small'>
      <Container inline right='small'>
        <Badge content={100} variant='red' />
      </Container>
      <Container inline right='small'>
        <Badge content={1} variant='red' />
      </Container>
    </Container>
  </>
)

export default Example
