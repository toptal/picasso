import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <Container top={SPACING_6} left={SPACING_6}>
    <Tooltip content='Content goes here...' open>
      <Button>Test me</Button>
    </Tooltip>
  </Container>
)

export default Example
