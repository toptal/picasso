import React from 'react'
import { Indicator, Typography, Container } from '@toptal/picasso'

const IndicatorDefaultExample = () => (
  <div>
    <div>
      <Container inline right='small'>
        <Indicator color='red' />
      </Container>
      <Typography inline size='medium'>
        High priority
      </Typography>
    </div>

    <div>
      <Container inline right='small'>
        <Indicator color='yellow' />
      </Container>
      <Typography inline size='medium'>
        Medium priority
      </Typography>
    </div>

    <div>
      <Container inline right='small'>
        <Indicator color='blue' />
      </Container>
      <Typography inline size='medium'>
        Low priority
      </Typography>
    </div>
  </div>
)

export default IndicatorDefaultExample
