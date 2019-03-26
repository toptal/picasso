import React from 'react'
import { Label } from '@toptal/picasso'

const LabelDismissibleExample = () => (
  <div>
    <Label onDelete={handleDelete}>React JS</Label>
  </div>
)

function handleDelete () {
  window.alert('You clicked the delete icon.')
}

export default LabelDismissibleExample
