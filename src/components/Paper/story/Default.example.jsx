import React from 'react'
import { Paper, Typography, Container } from '@toptal/picasso'

const PaperDefaultExample = () => (
  <div style={{ width: '25rem' }}>
    <Paper>
      <Container padded='small'>
        <Container bottom='small'>
          <Typography variant='h3' weight='bold'>
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

export default PaperDefaultExample
