import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary:
    </Typography>
    <Container top='small' bottom='large'>
      <Button>Primary Blue</Button>
      <Button variant='primary-red'>Primary Red</Button>
      <Button variant='primary-green'>Primary Green</Button>
    </Container>

    <Typography variant='heading' size='small'>
      Secondary:
    </Typography>
    <Container top='small'>
      <Button variant='secondary-blue'>Secondary Blue</Button>
      <Container
        left={0.5}
        padded={0.5}
        inline
        style={{ backgroundColor: palette.blue.main }}
      >
        <Button variant='secondary-white'>Secondary White</Button>
      </Container>
    </Container>
  </div>
)

export default Example
