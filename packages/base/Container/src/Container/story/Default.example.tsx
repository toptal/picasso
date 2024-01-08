import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_8}>Some text</Container>
    <Container left={SPACING_4}>Some more text with a small margin</Container>
  </div>
)

export default Example
