import { Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import React from 'react'
import { WaterfallBlue64 } from '@toptal/picasso-pictograms/Pictogram'

const Example = () => (
  <Container flex>
    <Container padded={SPACING_6} right={SPACING_6}>
      <WaterfallBlue64 scale={1} />
    </Container>
    <Container padded={SPACING_6}>
      <WaterfallBlue64 scale={2} />
    </Container>
  </Container>
)

export default Example
