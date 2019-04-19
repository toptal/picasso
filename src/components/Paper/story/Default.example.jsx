import React from 'react'
import { Paper, Typography, Container } from '@toptal/picasso'

const PaperDefaultExample = () => (
  <div style={{ width: '25rem' }}>
    <Paper>
      <Container p={1}>
        <Typography variant='h3' weight='bold' gutterBottom={1}>
          This is paper
        </Typography>
        <Typography>
          Paper can be used to build surface or other elements for your
          application.
        </Typography>
      </Container>
    </Paper>
  </div>
)

export default PaperDefaultExample
