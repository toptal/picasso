import React from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const placements = ['left', 'bottom', 'top', 'right']

const TooltipPlacementExample = () => (
  <div style={{ width: '800px', height: '230px', padding: '3rem 6rem' }}>
    {placements.map(placement => (
      <Container key={placement} my={3} mx={2} inline>
        <Tooltip arrow content='Content' open placement={placement}>
          <Button>{placement}</Button>
        </Tooltip>
      </Container>
    ))}
  </div>
)

export default TooltipPlacementExample
