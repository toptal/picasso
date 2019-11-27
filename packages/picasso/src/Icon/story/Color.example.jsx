import React from 'react'
import { Container } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const IconExample = () => (
  <div>
    <Container inline right='small'>
      <Settings16 color='red' />
    </Container>
    <Settings16 color='green' />
  </div>
)

export default IconExample
