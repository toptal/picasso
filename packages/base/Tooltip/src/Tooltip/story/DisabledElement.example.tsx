import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const TooltipControlListenersExample = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Container
        top={SPACING_8}
        bottom={SPACING_8}
        left={SPACING_8}
        right={SPACING_8}
        inline
      >
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
