import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Button icon={<Settings16 />}>Cog</Button>
    <Button icon={<Settings16 />} iconPosition='right'>
      Check
    </Button>
  </div>
)

export default Example
