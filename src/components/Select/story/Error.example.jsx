import React from 'react'
import { Select } from '@toptal/picasso'

const SelectDisabledExample = () => (
  <div>
    <Select error options={OPTIONS} placeholder='Error...' width='auto' />
  </div>
)

const OPTIONS = [
  { value: 1, text: 'Option 1' },
  { value: 2, text: 'Option 2' },
  { value: 3, text: 'Option 3' },
  { value: 4, text: 'Option 4' }
]

export default SelectDisabledExample
