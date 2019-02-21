import React from 'react'

import Select from '../Select'

const SelectCustomOptionsExample = () => (
  <div>
    <Select options={OPTIONS} placeholder='Custom options...' />
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
