import React from 'react'
import { Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column'>
    <Container bottom='medium'>
      <Typography variant='heading' size='medium'>
        Bordered
      </Typography>

      <Container bordered rounded padded='large' bottom='small' top='small'>
        White
      </Container>
      <Container bordered rounded variant='red' padded='large' bottom='small'>
        Red
      </Container>
      <Container
        bordered
        rounded
        variant='yellow'
        padded='large'
        bottom='small'
      >
        Yellow
      </Container>
      <Container bordered rounded variant='green' padded='large' bottom='small'>
        Green
      </Container>
      <Container bordered rounded variant='blue' padded='large' bottom='small'>
        Blue
      </Container>
      <Container bordered rounded variant='grey' padded='large'>
        Grey
      </Container>
    </Container>

    <Container>
      <Typography bottom='medium' variant='heading' size='medium'>
        Non-bordered
      </Typography>

      <Container rounded padded='large' bottom='small' top='small'>
        White
      </Container>
      <Container rounded variant='red' padded='large' bottom='small'>
        Red
      </Container>
      <Container rounded variant='yellow' padded='large' bottom='small'>
        Yellow
      </Container>
      <Container rounded variant='green' padded='large' bottom='small'>
        Green
      </Container>
      <Container rounded variant='blue' padded='large' bottom='small'>
        Blue
      </Container>
      <Container rounded variant='grey' padded='large'>
        Grey
      </Container>
    </Container>
  </Container>
)

export default Example
