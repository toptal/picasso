import React from 'react'
import { Container, Typography, Paper, Stepper } from '@toptal/picasso'

import { SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded={SPACING_6}>
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
