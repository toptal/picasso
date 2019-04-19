import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const TooltipArrowExample = () => (
  <div style={{ textAlign: 'center' }}>
    <Container my={3} mx={2} inline>
      <Tooltip content='Some content...' placement='top' trigger='hover'>
        <Button>Hover</Button>
      </Tooltip>
    </Container>
    <Container my={3} mx={2} inline>
      <Tooltip content='Some content...' placement='top' trigger='click'>
        <Button>Click</Button>
      </Tooltip>
    </Container>
  </div>
)

export default TooltipArrowExample
