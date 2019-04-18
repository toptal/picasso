import React from 'react'
import { Loader, Container } from '@toptal/picasso'

const LoaderSizesExample = () => (
  <div>
    <Container bottom={2}>
      <Loader size='small'>small</Loader>
    </Container>
    <Container bottom={2}>
      <Loader size='medium'>medium</Loader>
    </Container>
    <Loader size='large'>large</Loader>
  </div>
)

export default LoaderSizesExample
