import React from 'react'
import { Autocomplete } from '@toptal/picasso/lab'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const AutocompleteOtherOptionExample = () => (
  <div>
    <Autocomplete
      allowAny
      showOtherOption
      placeholder='Start typing country...'
      options={options}
      onSelect={item => console.log('onSelect value:', item)}
      onOtherOptionSelect={item =>
        console.log('onOtherOptionSelect value:', item)
      }
      onChange={inputValue => console.log('onChange value:', inputValue)}
    />
  </div>
)

export default AutocompleteOtherOptionExample
