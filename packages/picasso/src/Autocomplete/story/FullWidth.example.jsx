import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' }
]

const AutocompleteFullWidthExample = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      value=''
      width='full'
    />
  </div>
)

export default AutocompleteFullWidthExample
