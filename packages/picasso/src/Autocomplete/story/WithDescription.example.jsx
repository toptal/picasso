import React from 'react'
import { Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus', description: 'Population: 9.5M' },
  { text: 'Croatia', description: 'Population: 4M' },
  { text: 'Lithuania', description: 'Population: 3M' },
  { text: 'Slovakia', description: 'Population: 5.5M' },
  { text: 'Ukraine', description: 'Population: 42M' }
]

const Example = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      value=''
      data-testid='trigger'
    />
  </div>
)
export default Example
