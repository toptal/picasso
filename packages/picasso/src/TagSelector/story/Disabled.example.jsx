import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Kyrgyzstan', value: 'KG' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' }
]

const Example = () => (
  <div>
    <TagSelector options={options} value={options.slice(0, 4)} disabled />
  </div>
)

export default Example
