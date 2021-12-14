import React from 'react'
import { Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column'>
    <Container bottom='medium'>
      <Typography variant='heading' size='medium'>
        Bordered
      </Typography>

      <Container bordered rounded padded='medium' bottom='small' top='small'>
        White
      </Container>
    </Container>

    <Container>
      <Typography variant='heading' size='medium'>
        Non-bordered
      </Typography>

      <Container rounded padded='medium' bottom='small' top='small'>
        White
      </Container>
      <Container rounded variant='red' padded='medium' bottom='small'>
        Red
      </Container>
      <Container rounded variant='yellow' padded='medium' bottom='small'>
        Yellow
      </Container>
      <Container rounded variant='green' padded='medium' bottom='small'>
        Green
      </Container>
      <Container rounded variant='blue' padded='medium' bottom='small'>
        Blue
      </Container>
      <Container rounded variant='grey' padded='medium'>
        Grey
      </Container>
    </Container>
  </Container>
)

export default Example
