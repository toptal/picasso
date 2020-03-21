import React from 'react'
import { Stepper } from '@toptal/picasso'

const Example = () => (
  <div style={{ width: '40rem' }}>
    <Stepper fullWidth steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
  </div>
)

export default Example
