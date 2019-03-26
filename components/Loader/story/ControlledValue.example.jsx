import React from 'react'
import { Loader, Container } from '@toptal/picasso'

const LoaderControlledValueExample = () => (
  <div>
    <Container bottom={2}>
      <Loader value={50} variant='static'>
        50%
      </Loader>
    </Container>
    <Loader value={13} variant='determinate'>
      13%
    </Loader>
  </div>
)

export default LoaderControlledValueExample
