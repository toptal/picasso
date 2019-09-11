import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
  { value: 'ALG', text: 'Algeria' },
  { value: 'BY', text: 'Belarus' },
  { value: 'HR', text: 'Croatia' },
  { value: 'LU', text: 'Lithuania' },
  { value: 'SK', text: 'Slovakia' },
  { value: 'SP', text: 'Spain' },
  { value: 'UA', text: 'Ukraine' }
]

const TagSelectorDefaultExample = () => (
  <div>
    <TagSelector
      options={options}
      placeholder='Start typing...'
      onChange={selectedValues =>
        window.console.log('onChange values: ', selectedValues)
      }
      onInputChange={inputValue =>
        window.console.log('onInputChange value: ', inputValue)
      }
    />
  </div>
)

export default TagSelectorDefaultExample
