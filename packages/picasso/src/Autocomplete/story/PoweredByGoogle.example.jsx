import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const allOptions = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'United Kingdom of Great Britain and Ireland' }
]

const Example = () => (
  <Autocomplete
    placeholder='Start typing country...'
    options={allOptions}
    poweredByGoogle
  />
)

export default Example
