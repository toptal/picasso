import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container inline right={SPACING_8}>
      <span>Some inline text</span>
    </Container>
    <span>Another inline text</span>
  </div>
)

export default Example
