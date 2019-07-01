import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const results = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' }
]

const AutocompleteFullWidthExample = () => (
  <div>
    <Autocomplete results={results} fullWidth />
  </div>
)

export default AutocompleteFullWidthExample
