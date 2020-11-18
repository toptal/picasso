import React from 'react'
import { Tag } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Tag disabled icon={<Settings16 />} onDelete={handleDelete}>
      Tag
    </Tag>
  </div>
)

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

export default Example
