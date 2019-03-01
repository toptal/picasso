import React from 'react'
import { Loader, Container } from '@toptal/picasso'

const LoaderControlledValueExample = () => (
  <div>
    <Container bottom={2}>
      <Loader label='50%' value={50} variant='static' />
    </Container>
    <Loader label='13%' value={13} variant='determinate' />
  </div>
)

export default LoaderControlledValueExample
