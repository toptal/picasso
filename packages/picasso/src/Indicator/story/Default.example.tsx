import React from 'react'
import { Indicator, Typography, Container } from '@toptal/picasso'

const Example = () => (
  <>
    <Container bottom='medium'>
      <Container bottom='medium'>
        <Container inline right='small'>
          <Indicator color='light' />
        </Container>
        <Typography inline size='medium'>
          Pending item
        </Typography>
      </Container>

      <Container inline right='small'>
        <Indicator color='positive' />
      </Container>
      <Typography inline size='medium'>
        Completed item
      </Typography>
    </Container>

    <Container bottom='medium'>
      <Container inline right='small'>
        <Indicator color='negative' />
      </Container>
      <Typography inline size='medium'>
        High priority
      </Typography>
    </Container>

    <Container bottom='medium'>
      <Container inline right='small'>
        <Indicator color='warning' />
      </Container>
      <Typography inline size='medium'>
        Medium priority
      </Typography>
    </Container>

    <Container inline right='small'>
      <Indicator color='primary' />
    </Container>
    <Typography inline size='medium'>
      Low priority
    </Typography>
  </>
)

export default Example
