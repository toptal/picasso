import React from 'react'
import { Container } from '@toptal/picasso'

const spacing = {
  6: 1.5,
  10: 2.5,
}

const Example = () => (
  <div>
    <Container top={{xs: spacing[6], md: spacing[10]}}>Some text</Container>
    {/* <Container top={spacing[6]}>Some text</Container> */}
  </div>
)

export default Example
