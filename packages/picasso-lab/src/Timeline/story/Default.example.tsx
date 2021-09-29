import React from 'react'
import { Timeline } from '@toptal/picasso-lab'
import { Typography } from '@toptal/picasso'

const Example = () => (
  <Timeline>
    <Timeline.Row>
      <Typography variant='heading'>Founder</Typography>
      <Typography>Brutalism 2019 - PRESENT</Typography>
      <Typography>
        Founded a private practice focusing on computational design and art.
      </Typography>
    </Timeline.Row>

    <Timeline.Row>
      <Typography variant='heading'>Computational Geometry Engineer</Typography>
      <Typography>Arkio 2018 - 2019</Typography>
      <Typography>
        Worked on the core engine supporting Arkio's computational geometry
        operations in VR.
      </Typography>
    </Timeline.Row>
  </Timeline>
)

export default Example
