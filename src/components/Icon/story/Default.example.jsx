import React from 'react'
import { Button } from '@toptal/picasso'
import { Plus16 } from '@toptal/picasso/Icon'

const IconExample = () => (
  <div>
    <Button
      icon={
        <Plus16 style={{ position: 'relative', left: '0.5px', top: '0.5px' }} />
      }
      circular
    />
  </div>
)

export default IconExample
