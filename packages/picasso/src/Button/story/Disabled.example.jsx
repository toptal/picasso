import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button disabled>Disabled</Button>
    <Button disabled icon={<Settings16 />}>
      Disabled
    </Button>
    <Button disabled variant='transparent-green' icon={<Trash24 />} />
  </div>
)

export default Example
