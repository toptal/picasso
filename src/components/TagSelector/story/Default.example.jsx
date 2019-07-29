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
      value={['AF']}
      placeholder='Start typing...'
      onChange={value => console.log('onChange: ', value)}
      actionText='Add new option'
      onAdd={value => console.log('onAdd: ', value)}
      onInputChange={event => console.log('onInputChange: ', event)}
    />
  </div>
)

export default TagSelectorDefaultExample
