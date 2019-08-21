import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AI', label: 'Aland Islands' },
  { value: 'ALB', label: 'Albania' },
  { value: 'ALG', label: 'Algeria' },
  { value: 'BY', label: 'Belarus' },
  { value: 'HR', label: 'Croatia' },
  { value: 'LU', label: 'Lithuania' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SP', label: 'Spain' },
  { value: 'UA', label: 'Ukraine' }
]

const TagSelectorDefaultExample = () => (
  <div>
    <TagSelector
      options={options}
      value={['AF']}
      placeholder='Start typing...'
      onChange={value => console.log('onChange: ', value)}
      onInputChange={event => console.log('onInputChange: ', event)}
    />
  </div>
)

export default TagSelectorDefaultExample
