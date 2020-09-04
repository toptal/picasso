import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { Badge } from '@toptal/picasso-lab'

const Example = () => (
  <Container flex>
    <Container padded={0.5} right='small'>
      <Badge content='2' variant='red' size='small'>
        <Avatar size='xxsmall' name='Jacqueline Roque' />
      </Badge>
    </Container>

    <Container top={0.5}>
      <Badge content='200' variant='red' size='medium'>
        <Avatar size='small' name='Adam Jones' />
      </Badge>
    </Container>
  </Container>
)

export default Example
