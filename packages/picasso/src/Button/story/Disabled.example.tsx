import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = args => (
  <>
    <Button disabled>Disabled</Button>
    <Button disabled icon={<Settings16 />}>
      Disabled
    </Button>
  </>
)

export default Example.bind({})
Example.args = {}
