import React, { Fragment } from 'react'
import { Indicator, Typography, Container } from '@toptal/picasso'

const Example = () => (
  <Fragment>
    <Container bottom='medium'>
      <Container inline right='small'>
        <Indicator color='red' />
      </Container>
      <Typography inline size='medium'>
        High priority
      </Typography>
    </Container>

    <Container bottom='medium'>
      <Container inline right='small'>
        <Indicator color='yellow' />
      </Container>
      <Typography inline size='medium'>
        Medium priority
      </Typography>
    </Container>

    <Container inline right='small'>
      <Indicator color='blue' />
    </Container>
    <Typography inline size='medium'>
      Low priority
    </Typography>
  </Fragment>
)

export default Example
