import React from 'react'
import { Label } from '@toptal/picasso'

const LabelDismissibleExample = () => (
  <div>
    <Label label='React JS' onDelete={handleDelete} />
  </div>
)

function handleDelete () {
  window.alert('You clicked the delete icon.')
}

export default LabelDismissibleExample
