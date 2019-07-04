import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' }
]

const AutocompleteDefaultExample = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      onSelect={item => console.log('onSelect value:', item)}
      onChange={value => console.log('onChange value:', value)}
    />
  </div>
)

export default AutocompleteDefaultExample
