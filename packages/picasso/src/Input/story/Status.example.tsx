import React from 'react'
import { Container, Input } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Input placeholder='default' status='default' />
      </Container>
      <Container padded='small'>
        <Input placeholder='error' status='error' />
      </Container>
      <Container padded='small'>
        <Input placeholder='success' status='success' />
      </Container>
    </Container>
  )
}

export default Example
