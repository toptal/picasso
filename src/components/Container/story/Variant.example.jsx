import React from 'react'
import { Container } from '@toptal/picasso'

const ContainerDefaultExample = () => (
  <div>
    <Container bordered padded='large'>
      Default white
    </Container>
    <Container bordered variant='red' padded='large'>
      Red
    </Container>
    <Container bordered variant='yellow' padded='large'>
      Yellow
    </Container>
    <Container bordered variant='green' padded='large'>
      Green
    </Container>
    <Container bordered variant='blue' padded='large'>
      Blue
    </Container>

    <Container padded='large'>Default white</Container>
    <Container variant='red' padded='large'>
      Red
    </Container>
    <Container variant='yellow' padded='large'>
      Yellow
    </Container>
    <Container variant='green' padded='large'>
      Green
    </Container>
    <Container variant='blue' padded='large'>
      Blue
    </Container>
  </div>
)

export default ContainerDefaultExample
