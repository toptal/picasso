import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const TooltipArrowExample = () => (
  <div style={{ textAlign: 'center' }}>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip content='Some content...' placement='top' trigger='hover'>
        <Button>Hover</Button>
      </Tooltip>
    </Container>
    <Container top='large' bottom='large' left='large' right='large' inline>
      <Tooltip content='Some content...' placement='top' trigger='click'>
        <Button>Click</Button>
      </Tooltip>
    </Container>
  </div>
)

export default TooltipArrowExample
