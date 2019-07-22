import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AI', label: 'Aland Islands' },
  { value: 'ALB', label: 'Albania' },
  { value: 'ALG', label: 'Algeria' }
]

const TagSelectorDefaultExample = () => (
  <div>
    <TagSelector
      options={options}
      preselectedItems={['AF']}
      placeholder='Start typing...'
      onChange={value => console.log('onChange: ', value)}
      actionText='Add new option'
      onAdd={value => console.log('onAdd: ', value)}
    />
  </div>
)

export default TagSelectorDefaultExample
