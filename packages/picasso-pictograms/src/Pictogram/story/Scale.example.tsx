import { Container } from '@toptal/picasso'
import React from 'react'
import { WaterfallCascadeBlue64 } from '@toptal/picasso-pictograms/Pictogram'

const Example = () => (
  <Container flex>
    <Container padded='medium' right='medium'>
      <WaterfallCascadeBlue64 scale={1} />
    </Container>
    <Container padded='medium'>
      <WaterfallCascadeBlue64 scale={2} />
    </Container>
  </Container>
)

export default Example
