import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Alert } from '@toptal/picasso-lab'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Yellow
        </Typography>
      </Container>
      <Alert>This is a warning alert.</Alert>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Red
        </Typography>
      </Container>
      <Alert variant='red'>This is a critical warning alert.</Alert>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Blue
        </Typography>
      </Container>
      <Alert variant='blue'>This is a info alert.</Alert>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Green
        </Typography>
      </Container>
      <Alert variant='green'>This is a success alert.</Alert>
    </Container>
  </div>
)

export default Example
