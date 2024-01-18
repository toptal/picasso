import React from 'react'
import { Indicator, Typography, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container inline right={SPACING_4}>
        <Indicator color='light-blue' />
      </Container>
      <Typography inline size='medium'>
        Light blue
      </Typography>
    </Container>

    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_6}>
        <Container inline right={SPACING_4}>
          <Indicator color='light-grey' />
        </Container>
        <Typography inline size='medium'>
          Pending item
        </Typography>
      </Container>

      <Container inline right={SPACING_4}>
        <Indicator color='green' />
      </Container>
      <Typography inline size='medium'>
        Completed item
      </Typography>
    </Container>

    <Container bottom={SPACING_6}>
      <Container inline right={SPACING_4}>
        <Indicator color='red' />
      </Container>
      <Typography inline size='medium'>
        High priority
      </Typography>
    </Container>

    <Container bottom={SPACING_6}>
      <Container inline right={SPACING_4}>
        <Indicator color='yellow' />
      </Container>
      <Typography inline size='medium'>
        Medium priority
      </Typography>
    </Container>

    <Container inline right={SPACING_4}>
      <Indicator color='blue' />
    </Container>
    <Typography inline size='medium'>
      Low priority
    </Typography>
  </>
)

export default Example
