import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' }
]

const AutocompleteLoadingExample = () => (
  <div>
    <Autocomplete placeholder='Loading state...' options={options} loading />
  </div>
)

export default AutocompleteLoadingExample
