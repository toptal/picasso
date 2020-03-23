import React from 'react'
import { Label } from '@toptal/picasso'

const Example = () => (
  <div>
    <Label onDelete={handleDelete}>Label</Label>
  </div>
)

function handleDelete() {
  window.alert('You clicked the delete icon.')
}

export default Example
