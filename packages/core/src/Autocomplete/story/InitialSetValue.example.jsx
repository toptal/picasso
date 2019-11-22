import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' }
]

const AutocompleteInitialSetValueExample = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      onSelect={item => console.log('onSelect value:', item)}
      onChange={inputValue => console.log('onChange value:', inputValue)}
      value='Belarus'
    />
  </div>
)

export default AutocompleteInitialSetValueExample
