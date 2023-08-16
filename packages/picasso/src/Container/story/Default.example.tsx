import React from 'react'
import { Container } from '@toptal/picasso'
import { picassoSpacings } from '@toptal/picasso-shared/index'

const Example = () => (
  <div>
    <Container top={{xs: picassoSpacings[6], md: 1}}>Some text</Container>
    {/* <Container top={spacing[6]}>Some text</Container> */}
  </div>
)

export default Example
