import React from 'react'
import { Loader, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='large'>
      <Loader size='small'>small</Loader>
    </Container>
    <Container bottom='large'>
      <Loader size='medium'>medium</Loader>
    </Container>
    <Loader size='large'>large</Loader>
  </div>
)

export default Example
