import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const results = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' }
]

const AutocompleteDefaultExample = () => (
  <div>
    <Autocomplete results={results} />
  </div>
)

export default AutocompleteDefaultExample
