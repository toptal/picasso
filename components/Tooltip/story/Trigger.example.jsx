import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const TooltipArrowExample = () => (
  <div style={{ textAlign: 'center' }}>
    <Container bottom={3} left={2} right={2} top={3} inline>
      <Tooltip content='Some content...' placement='top' trigger='hover'>
        <Button>Hover</Button>
      </Tooltip>
    </Container>
    <Container bottom={3} left={2} right={2} top={3} inline>
      <Tooltip content='Some content...' placement='top' trigger='click'>
        <Button>Click</Button>
      </Tooltip>
    </Container>
  </div>
)

export default TooltipArrowExample
