import React from 'react'
import { Label } from '@toptal/picasso'

const LabelGroupExample = () => (
  <Label.Group>
    <Label label='Angular JS' />
    <Label label='React JS' />
    <Label label='Ember JS' onDelete={handleDelete} />
    <Label label='Vue JS' />
  </Label.Group>
)

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

export default LabelGroupExample
