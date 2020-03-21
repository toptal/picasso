import React from 'react'
import { Label } from '@toptal/picasso'

const Example = () => (
  <Label.Group>
    <Label>Angular JS</Label>
    <Label>React JS</Label>
    <Label onDelete={handleDelete}>Ember JS</Label>
    <Label>Vue JS</Label>
  </Label.Group>
)

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

export default Example
