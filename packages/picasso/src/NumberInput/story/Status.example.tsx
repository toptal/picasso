import React from 'react'
import { Container, NumberInput } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <NumberInput placeholder='default' status='default' />
      </Container>
      <Container padded='small'>
        <NumberInput placeholder='error' status='error' />
      </Container>
      <Container padded='small'>
        <NumberInput placeholder='success' status='success' />
      </Container>
    </Container>
  )
}

export default Example
