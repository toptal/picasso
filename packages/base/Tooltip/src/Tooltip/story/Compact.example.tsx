import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_8} left={SPACING_8} inline>
    <Tooltip content='Content' open placement='top' compact>
      <Button>Compact</Button>
    </Tooltip>
  </Container>
)

export default Example
