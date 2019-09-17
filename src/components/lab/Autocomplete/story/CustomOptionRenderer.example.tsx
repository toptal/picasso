import React from 'react'
import { Autocomplete } from '@toptal/picasso/lab'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const CustomOptionRenderer = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      renderOption={option => (
        <span
          style={{ color: 'green', background: 'yellow', fontWeight: 'bold' }}
        >
          {option.text}
        </span>
      )}
    />
  </div>
)

export default CustomOptionRenderer
