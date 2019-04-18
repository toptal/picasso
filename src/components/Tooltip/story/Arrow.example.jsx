import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const TooltipArrowExample = () => (
  <div
    style={{
      textAlign: 'center',
      width: '400px',
      height: '200px',
      paddingTop: '3rem'
    }}
  >
    <Container bottom={3} left={2} right={2} top={3} inline>
      <Tooltip content='Content' open placement='top'>
        <Button>Arrow</Button>
      </Tooltip>
    </Container>
    <Container bottom={3} left={2} right={2} top={3} inline>
      <Tooltip arrow={false} content='Content' open placement='top'>
        <Button>No Arrow</Button>
      </Tooltip>
    </Container>
  </div>
)

export default TooltipArrowExample
