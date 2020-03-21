import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16, Settings24 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button icon={<Settings16 />} circular size='small' />
    <Button icon={<Settings16 />} circular />
    <Button icon={<Settings24 />} circular size='large' />
  </div>
)

export default Example
