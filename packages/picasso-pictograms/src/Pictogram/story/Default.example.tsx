import React from 'react'
import {
  WaterfallWhite64,
  WaterfallBlue64,
} from '@toptal/picasso-pictograms/Pictogram'
import { Container } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container right='medium'>
      <Container padded='medium' variant='grey'>
        <WaterfallWhite64 />
      </Container>
    </Container>
    <Container>
      <Container padded='medium' variant='grey'>
        <WaterfallBlue64 />
      </Container>
    </Container>
  </Container>
)

export default Example
