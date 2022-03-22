import React from 'react'
import { Container, Select } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Select placeholder='default' status='default' options={[]} />
      </Container>
      <Container padded='small'>
        <Select placeholder='error' status='error' options={[]} />
      </Container>
      <Container padded='small'>
        <Select placeholder='success' status='success' options={[]} />
      </Container>
    </Container>
  )
}

export default Example
