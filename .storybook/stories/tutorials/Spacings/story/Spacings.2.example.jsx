import React from 'react'
import { Container, Typography, Paper, Stepper } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded='medium'>
        <Container flex justifyContent='space-between' alignItems='flex-start'>
          <Container>
            <Typography variant='heading' size='small'>
              UX Designer
            </Typography>
            <Typography size='small'>2 positions Open</Typography>
          </Container>
          <Stepper
            hideLabels
            active={2}
            steps={['Initial', 'Check', 'Interview', 'Agreement']}
          />
        </Container>
      </Container>
    </Paper>
  </div>
)

export default Example
