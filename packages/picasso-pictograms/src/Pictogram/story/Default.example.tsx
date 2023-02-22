import React from 'react'
import {
  WaterfallCascadeWhite64,
  WaterfallCascadeBlue64,
} from '@toptal/picasso-pictograms/Pictogram'
import { Container } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container right='medium'>
      <Container padded='medium' variant='grey'>
        <WaterfallCascadeWhite64 />
      </Container>
    </Container>
    <Container>
      <Container padded='medium' variant='grey'>
        <WaterfallCascadeBlue64 />
      </Container>
    </Container>
  </Container>
)

export default Example
