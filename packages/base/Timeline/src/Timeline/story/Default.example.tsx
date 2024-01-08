import React from 'react'
import { Timeline, Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <Timeline>
    <Timeline.Row>
      <Typography size='medium' variant='heading'>
        Founder
      </Typography>
      <Container bottom={SPACING_4}>
        <Typography size='xsmall'>Brutalism 2019 - PRESENT</Typography>
      </Container>
      <Typography size='medium'>
        Founded a private practice focusing on computational design and art.
      </Typography>
    </Timeline.Row>

    <Timeline.Row>
      <Typography size='medium' variant='heading'>
        Computational Geometry Engineer
      </Typography>
      <Container bottom={SPACING_4}>
        <Typography size='xsmall'>Arkio 2018 - 2019</Typography>
      </Container>
      <Typography size='medium'>
        Worked on the core engine supporting Arkio's computational geometry
        operations in VR.
      </Typography>
    </Timeline.Row>
  </Timeline>
)

export default Example
