import React from 'react'
import { Container, Typography, Paper, Stepper, Avatar } from '@toptal/picasso'

import { SPACING_2, SPACING_6, SPACING_4 } from '@toptal/picasso/utils'

const JobCandidate = () => (
  <Container right={SPACING_2}>
    <Avatar
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
  </Container>
)

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded={SPACING_6}>
        <Container
          flex
          justifyContent='space-between'
          alignItems='flex-start'
          bottom={SPACING_4}
        >
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
        <Typography size='small'>Candidates</Typography>
        <Container top={SPACING_4} flex>
          <JobCandidate />
          <JobCandidate />
          <JobCandidate />
        </Container>
      </Container>
    </Paper>
  </div>
)

export default Example
