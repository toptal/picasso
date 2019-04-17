import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const TooltipArrowExample = () => (
  <div style={{ textAlign: 'center' }}>
    <Container bottom={3} left={2} right={2} top={3} inline>
      <Tooltip content='You can not hover inside!' placement='top'>
        <Button>Non interactive</Button>
      </Tooltip>
    </Container>
    <Container bottom={3} left={2} right={2} top={3} inline>
      <Tooltip content='Hover inside' interactive placement='top'>
        <Button>Interactive</Button>
      </Tooltip>
    </Container>
  </div>
)

export default TooltipArrowExample
