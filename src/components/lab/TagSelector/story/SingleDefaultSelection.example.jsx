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

const TagSelectorSingleDefaultSelectionExample = () => (
  <div>
    <TagSelector
      options={options}
      defaultValues={[options[0].value]}
      placeholder='Start typing...'
      onChange={selectedValues =>
        window.console.log('onChange values: ', selectedValues)
      }
      onInputChange={e =>
        window.console.log('onInputChange value: ', e.target.value)
      }
    />
  </div>
)

export default TagSelectorSingleDefaultSelectionExample
