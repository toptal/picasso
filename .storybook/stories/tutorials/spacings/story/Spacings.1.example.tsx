import React from 'react'
import { Container, Paper } from '@toptal/picasso'

import { SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded={SPACING_6}>Card content</Container>
    </Paper>
  </div>
)

export default Example
