import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Button>Primary (Default)</Button>

    <Button variant='negative'>Negative</Button>

    <Button variant='positive'>Positive</Button>

    <Button variant='secondary'>Secondary</Button>

    <Container
      top='small'
      left='small'
      padded={0.5}
      inline
      style={{ backgroundColor: palette.blue.main }}
    >
      <Button variant='transparent'>Transparent</Button>
    </Container>
  </div>
)

export default Example
