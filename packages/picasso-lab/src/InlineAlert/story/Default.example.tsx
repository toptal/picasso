import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { InlineAlert } from '@toptal/picasso-lab'

const Example = () => (
  <div>
    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Yellow (default)
        </Typography>
      </Container>
      <InlineAlert>This is a warning inline alert.</InlineAlert>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Red
        </Typography>
      </Container>
      <InlineAlert variant='red'>
        This is a critical warning inline alert.
      </InlineAlert>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Blue
        </Typography>
      </Container>
      <InlineAlert variant='blue'>This is a info inline alert.</InlineAlert>
    </Container>

    <Container bottom={1}>
      <Container bottom={1}>
        <Typography variant='heading' size='small'>
          Green
        </Typography>
      </Container>
      <InlineAlert variant='green'>This is a success inline alert.</InlineAlert>
    </Container>
  </div>
)

export default Example
