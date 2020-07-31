import React from 'react'
import { Tooltip, Button, Container, Checkbox } from '@toptal/picasso'

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

      <Container top='large' bottom='large' left='large' right='large' inline>
        <Tooltip content='Checkbox with label' placement='top'>
          <span>
            <Checkbox disabled label='Checkbox' />
          </span>
        </Tooltip>
      </Container>

      <Container top='large' bottom='large' left='large' right='large' inline>
        <Tooltip content='Checkbox without label' placement='top'>
          <span>
            <Checkbox disabled />
          </span>
        </Tooltip>
      </Container>
    </div>
  )
}

export default TooltipControlListenersExample
