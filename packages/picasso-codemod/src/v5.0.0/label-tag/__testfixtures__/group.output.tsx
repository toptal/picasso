import React from 'react'
import { Tag } from '@toptal/picasso'

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

const Example = () => (
  <Tag.Group>
    <Tag>Angular JS</Tag>
    <Tag>React JS</Tag>
    <Tag onDelete={handleDelete}>Ember JS</Tag>
    <Tag>Vue JS</Tag>
  </Tag.Group>
)

export default Example
