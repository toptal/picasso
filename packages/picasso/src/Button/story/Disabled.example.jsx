import React from 'react'
import { Button } from '@toptal/picasso'
import { Trash24 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button disabled>Disabled</Button>
    <Button disabled variant='secondary-red'>
      Secondary Disabled
    </Button>
    <Button disabled variant='transparent-green' icon={<Trash24 />} />
  </div>
)

export default Example
