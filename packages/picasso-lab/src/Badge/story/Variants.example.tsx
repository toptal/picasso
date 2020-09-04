import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { Badge } from '@toptal/picasso-lab'

const Example = () => (
  <Container flex>
    <Container padded={0.5} right='small'>
      <Badge content='1' variant='white'>
        <Avatar name='Jacqueline Roque' />
      </Badge>
    </Container>

    <Container top={0.5}>
      <Badge content='100' variant='red'>
        <Avatar name='Adam Jones' />
      </Badge>
    </Container>
  </Container>
)

export default Example
