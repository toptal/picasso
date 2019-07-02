import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const suggestions = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' }
]

const AutocompleteLoadingExample = () => (
  <div>
    <Autocomplete
      placeholder='Loading state...'
      suggestions={suggestions}
      loading
    />
  </div>
)

export default AutocompleteLoadingExample
