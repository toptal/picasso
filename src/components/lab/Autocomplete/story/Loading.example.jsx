import React from 'react'
import { Autocomplete } from '@toptal/picasso/lab'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const AutocompleteLoadingExample = () => (
  <div>
    <Autocomplete placeholder='Loading state...' options={options} loading />
  </div>
)

export default AutocompleteLoadingExample
