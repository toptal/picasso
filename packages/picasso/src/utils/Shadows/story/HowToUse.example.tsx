import React from 'react'
import { shadows } from '@toptal/picasso/utils'
import { Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Typography>
    Use the shadow just directly from Picasso. For example,
    <Container
      padded='small'
      top='small'
      style={{ boxShadow: shadows[4] }}
      rounded
    >
      I have a box-shadow like a tooltip
    </Container>
  </Typography>
)

export default Example
