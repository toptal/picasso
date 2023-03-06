import { Container } from '@toptal/picasso'
import React from 'react'
import { WaterfallBlue64 } from '@toptal/picasso-pictograms/Pictogram'

const Example = () => (
  <Container flex>
    <Container padded='medium' right='medium'>
      <WaterfallBlue64 scale={1} />
    </Container>
    <Container padded='medium'>
      <WaterfallBlue64 scale={2} />
    </Container>
  </Container>
)

export default Example
