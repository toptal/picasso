import React from 'react'
import { Container, Autocomplete } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Autocomplete placeholder='default' value='Ukraine' status='default' />
      </Container>
      <Container padded='small'>
        <Autocomplete placeholder='success' value='Ukraine' status='success' />
      </Container>
      <Container padded='small'>
        <Autocomplete placeholder='error' value='Ukraine' status='error' />
      </Container>
    </Container>
  )
}

export default Example
