import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { AlertInline } from '@toptal/picasso-lab'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Yellow (default)
        </Typography>
      </Container>
      <AlertInline>This is a warning inline alert.</AlertInline>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Red
        </Typography>
      </Container>
      <AlertInline variant='red'>
        This is a critical warning inline alert.
      </AlertInline>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Blue
        </Typography>
      </Container>
      <AlertInline variant='blue'>This is a info inline alert.</AlertInline>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Green
        </Typography>
      </Container>
      <AlertInline variant='green'>This is a success inline alert.</AlertInline>
    </Container>
  </div>
)

export default Example
