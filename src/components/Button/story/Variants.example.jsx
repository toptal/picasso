import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const ButtonVariantsExample = () => (
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
    <Container top='small' bottom='large'>
      <Button variant='secondary-blue'>Secondary Blue</Button>
      <Button variant='secondary-red'>Secondary Red</Button>
      <Container
        left={0.5}
        padded={0.5}
        inline
        style={{ backgroundColor: palette.primary.main }}
      >
        <Button variant='secondary-white'>Secondary White</Button>
      </Container>
    </Container>

    <Typography variant='heading' size='small'>
      Others:
    </Typography>
    <Container top='small'>
      <Button variant='flat'>Flat</Button>
    </Container>
  </div>
)

export default ButtonVariantsExample
