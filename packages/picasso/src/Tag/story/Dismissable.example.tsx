import React from 'react'
import { Tag } from '@toptal/picasso'

const Example = () => (
  <div>
    <Tag onDelete={handleDelete}>Tag</Tag>
  </div>
)

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

export default Example
