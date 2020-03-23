import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' }
]

const Example = () => (
  <div>
    <TagSelector placeholder='Loading state...' options={options} loading />
  </div>
)

export default Example
