import React from 'react'
import { Loader, Container } from '@toptal/picasso'

const LoaderSizesExample = () => (
  <div>
    <Container bottom={2}>
      <Loader label='small' size='small' />
    </Container>
    <Container bottom={2}>
      <Loader label='default' size='default' />
    </Container>
    <Loader label='large' size='large' />
  </div>
)

export default LoaderSizesExample
