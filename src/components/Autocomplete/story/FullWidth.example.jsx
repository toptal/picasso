import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' }
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
