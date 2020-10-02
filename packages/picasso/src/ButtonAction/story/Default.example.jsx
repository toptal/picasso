import React from 'react'
import { Button } from '@toptal/picasso'
import { Link16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button.Action>Default</Button.Action>
    <Button.Action icon={<Link16 />}>
      Default with icon on the left
    </Button.Action>
    <Button.Action icon={<Link16 />} iconPosition='right'>
      Default with icon on the right
    </Button.Action>
  </div>
)

export default Example
