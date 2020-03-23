import React from 'react'
import { Container } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Container inline right='small'>
      <Settings16 color='red' />
    </Container>
    <Container inline right='small'>
      <Settings16 color='green' />
    </Container>
    <Container
      inline
      right='small'
      style={{ backgroundColor: 'black' }}
      padded='xsmall'
    >
      <Settings16 color='white' />
    </Container>
  </div>
)

export default Example
