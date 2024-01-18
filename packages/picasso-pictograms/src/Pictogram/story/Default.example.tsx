import React from 'react'
import {
  WaterfallWhite64,
  WaterfallBlue64,
} from '@toptal/picasso-pictograms/Pictogram'
import { Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex>
    <Container right={SPACING_6}>
      <Container padded={SPACING_6} variant='grey'>
        <WaterfallWhite64 />
      </Container>
    </Container>
    <Container>
      <Container padded={SPACING_6} variant='grey'>
        <WaterfallBlue64 />
      </Container>
    </Container>
  </Container>
)

export default Example
