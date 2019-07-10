import React from 'react'
import { Label } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const LabelDisabledExample = () => (
  <div>
    <Label disabled icon={<Cog />} onDelete={handleDelete}>
      Label
    </Label>
  </div>
)

function handleDelete() {
  window.alert('You clicked the delete icon.')
}

export default LabelDisabledExample
