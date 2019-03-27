import React from 'react'
import { Select } from '@toptal/picasso'

const SelectShrinkExample = () => (
  <div>
    <Select shrink options={OPTIONS} placeholder='A' />
  </div>
)

const OPTIONS = [
  { value: 1, text: 'A' },
  { value: 2, text: 'B' },
  { value: 3, text: 'C' },
  { value: 4, text: 'D' }
]

export default SelectShrinkExample
