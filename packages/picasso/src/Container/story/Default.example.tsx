import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom='small'>Some text</Container>
    <Container left={SPACING_4}>Some more text with a small margin</Container>
  </div>
)

export default Example
