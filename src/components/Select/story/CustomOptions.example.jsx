import React from 'react'
import { Select } from '@toptal/picasso'

const SelectCustomOptionsExample = () => (
  <div>
    <Select options={OPTIONS} placeholder='Custom options...' width='auto' />
  </div>
)

const OPTIONS = [
  { value: 1, text: 'Option 1' },
  {
    value: 2,
    text: (
      <div>
        Option <b>custom</b>
      </div>
    )
  }
]

export default SelectCustomOptionsExample
