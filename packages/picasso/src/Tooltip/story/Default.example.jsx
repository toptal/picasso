import React from 'react'
import { Tooltip, Button } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '320px', height: '120px', padding: '2rem' }}>
    <Tooltip content='Content goes here...' open placement='right'>
      <Button>Test me</Button>
    </Tooltip>
  </div>
)

export default Example
