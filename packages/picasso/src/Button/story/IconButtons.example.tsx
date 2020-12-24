import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16, Settings24 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button icon={<Settings16 />} size='small' />
    <Button icon={<Settings16 />} />
    <Button icon={<Settings24 />} size='large' />
  </div>
)

export default Example
