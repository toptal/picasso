import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' }
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
