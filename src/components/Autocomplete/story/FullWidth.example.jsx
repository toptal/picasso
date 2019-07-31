import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const AutocompleteFullWidthExample = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      width='full'
    />
  </div>
)

export default AutocompleteFullWidthExample
