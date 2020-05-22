import React from 'react'
import { Button } from '@toptal/picasso'
import { Pizza24 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button variant='pizza' size='large'>
      <Pizza24 style={{ paddingRight: '12px' }} /> I want some Pizza!
    </Button>
  </div>
)

export default Example
