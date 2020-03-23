import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus' },
  { text: 'Croatia' },
  { text: 'Lithuania' },
  { text: 'Slovakia' },
  { text: 'Ukraine' }
]

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Loading state...'
      options={options}
      value=''
      loading
    />
  </div>
)

export default Example
