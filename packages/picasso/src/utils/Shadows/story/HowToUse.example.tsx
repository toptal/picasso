import React from 'react'
import { shadows, SPACING_4 } from '@toptal/picasso/utils'
import { Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Typography>
    Use the shadow just directly from Picasso. For example,
    <Container
      padded={SPACING_4}
      top={SPACING_4}
      style={{ boxShadow: shadows[4] }}
      rounded
    >
      I have a box-shadow like a tooltip
    </Container>
  </Typography>
)

export default Example
