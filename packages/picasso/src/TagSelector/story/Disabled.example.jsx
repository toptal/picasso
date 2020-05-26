import React from 'react'
import { TagSelector } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Kyrgyzstan', value: 'KG' }
]

const Example = () => (
  <div>
    <TagSelector options={options} value={options} disabled />
  </div>
)

export default Example
