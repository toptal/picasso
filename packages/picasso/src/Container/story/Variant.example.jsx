import React from 'react'
import { Container, Typography } from '@toptal/picasso'

const ContainerDefaultExample = () => (
  <Container flex direction='column'>
    <Container bottom='medium'>
      <Typography variant='heading' size='medium'>
        Bordered
      </Typography>

      <Container bordered padded='large' bottom='small' top='small'>
        White
      </Container>
      <Container bordered variant='red' padded='large' bottom='small'>
        Red
      </Container>
      <Container bordered variant='yellow' padded='large' bottom='small'>
        Yellow
      </Container>
      <Container bordered variant='green' padded='large' bottom='small'>
        Green
      </Container>
      <Container bordered variant='blue' padded='large' bottom='small'>
        Blue
      </Container>
      <Container bordered variant='grey' padded='large'>
        Grey
      </Container>
    </Container>

    <Container>
      <Typography bottom='medium' variant='heading' size='medium'>
        Non-bordered
      </Typography>

      <Container padded='large' bottom='small' top='small'>
        White
      </Container>
      <Container variant='red' padded='large' bottom='small'>
        Red
      </Container>
      <Container variant='yellow' padded='large' bottom='small'>
        Yellow
      </Container>
      <Container variant='green' padded='large' bottom='small'>
        Green
      </Container>
      <Container variant='blue' padded='large' bottom='small'>
        Blue
      </Container>
      <Container variant='grey' padded='large'>
        Grey
      </Container>
    </Container>
  </Container>
)

export default ContainerDefaultExample
