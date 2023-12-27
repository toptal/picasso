import React from 'react'
import { Loader, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_8}>
      <Loader size='small'>small</Loader>
    </Container>
    <Container bottom={SPACING_8}>
      <Loader size='medium'>medium</Loader>
    </Container>
    <Loader size='large'>large</Loader>
  </div>
)

export default Example
