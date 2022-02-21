import React from 'react'
import { Container, Typography, Paper, Stepper, Avatar } from '@toptal/picasso'

const JobCandidate = () => (
  <Container right='xsmall'>
    <Avatar
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
  </Container>
)

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded='medium'>
        <Container
          flex
          justifyContent='space-between'
          alignItems='flex-start'
          bottom='small'
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
        <Container top='small' flex>
          <JobCandidate />
          <JobCandidate />
          <JobCandidate />
        </Container>
      </Container>
    </Paper>
  </div>
)

export default Example
