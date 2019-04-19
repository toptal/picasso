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
    <Container my={3} mx={2} inline>
      <Tooltip content='Content' open placement='top'>
        <Button>Arrow</Button>
      </Tooltip>
    </Container>
    <Container my={3} mx={2} inline>
      <Tooltip arrow={false} content='Content' open placement='top'>
        <Button>No Arrow</Button>
      </Tooltip>
    </Container>
  </div>
)

export default TooltipArrowExample
