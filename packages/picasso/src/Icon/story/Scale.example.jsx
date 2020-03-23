import React from 'react'
import { Container } from '@toptal/picasso'
import { Settings16, Settings24 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Container inline right='small'>
      <Settings16 scale={2} />
    </Container>
    <Container inline right='small'>
      <Settings24 scale={2} />
    </Container>
    <Container inline right='small'>
      <Settings16 scale={3} />
    </Container>
    <Container inline right='small'>
      <Settings24 scale={3} />
    </Container>
  </div>
)

export default Example
