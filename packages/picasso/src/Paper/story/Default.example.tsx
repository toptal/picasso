import React from 'react'
import { Paper, Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ width: '25rem' }}>
    <Paper>
      <Container padded={SPACING_4}>
        <Container bottom={SPACING_4}>
          <Typography variant='heading' size='medium'>
            This is paper
          </Typography>
        </Container>
        <Typography>
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
      </Container>
    </Paper>
  </div>
)

export default Example
