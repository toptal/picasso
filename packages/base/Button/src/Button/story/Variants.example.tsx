import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { SPACING_4, SPACING_2, palette } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Button>Primary (Default)</Button>

    <Button variant='negative'>Negative</Button>

    <Button variant='positive'>Positive</Button>

    <Button variant='secondary'>Secondary</Button>

    <Container
      top={SPACING_4}
      left={SPACING_4}
      padded={SPACING_2}
      inline
      style={{ backgroundColor: palette.blue.main }}
    >
      <Button foo='bar' variant='transparent'>
        Transparent
      </Button>
    </Container>
  </div>
)

export default Example
