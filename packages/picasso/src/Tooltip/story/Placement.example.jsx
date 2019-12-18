import React from 'react'
import { Tooltip, Button } from '@toptal/picasso'

const placements = ['bottom', 'bottom-end', 'left', 'right', 'top']

const TooltipPlacementExample = () => (
  <React.Fragment>
    {placements.map(placement => (
      <div key={placement} style={{ marginBottom: '100px' }}>
        <Tooltip arrow content='Content' open placement={placement}>
          <Button>{placement}</Button>
        </Tooltip>
      </div>
    ))}
  </React.Fragment>
)

export default TooltipPlacementExample
