import React from 'react'
import { Label } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Label disabled icon={<Settings16 />} onDelete={handleDelete}>
      Label
    </Label>
  </div>
)

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

export default Example
