import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const ButtonVariantsExample = () => (
  <div>
    <Button>Primary Blue</Button>
    <Button variant='secondary-blue'>Secondary Blue</Button>
    <Button variant='primary-red'>Primary Red</Button>
    <Button variant='secondary-red'>Secondary Red</Button>
    <Button variant='primary-green'>Primary Green</Button>
    <Button variant='flat'>Flat</Button>
    <Container
      left={0.5}
      padded={0.5}
      inline
      style={{ backgroundColor: palette.primary.main }}
    >
      <Button variant='secondary-white'>Secondary White</Button>
    </Container>
  </div>
)

export default ButtonVariantsExample
