import React from 'react'
import { Paper, Typography, Container } from '@toptal/picasso'

const PaperDefaultExample = () => (
  <div style={{ width: '25rem' }}>
    <Container bottom={1}>
      <Paper elevation={1}>
        <ExampleContent elevation={1} />
      </Paper>
    </Container>
    <Container bottom={1}>
      <Paper elevation={2}>
        <ExampleContent elevation={2} />
      </Paper>
    </Container>
    <Container bottom={1}>
      <Paper elevation={3}>
        <ExampleContent elevation={3} />
      </Paper>
    </Container>
    <Container bottom={1}>
      <Paper elevation={4}>
        <ExampleContent elevation={4} />
      </Paper>
    </Container>
  </div>
)

const ExampleContent = ({ elevation }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <Container bottom={1}>
        <Typography variant='h3' weight='bold'>
          Elevation {elevation}
        </Typography>
      </Container>
      <Typography>
        Paper can be used to build surface or other elements for your
        application.
      </Typography>
    </div>
  )
}

export default PaperDefaultExample
