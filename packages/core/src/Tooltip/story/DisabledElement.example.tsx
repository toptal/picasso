import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const TooltipControlListenersExample = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Container top='large' bottom='large' left='large' right='large' inline>
        <Tooltip content='Some content...' placement='top'>
          <span>
            <Button disabled>Hover</Button>
          </span>
        </Tooltip>
      </Container>
    </div>
  )
}

export default TooltipControlListenersExample
