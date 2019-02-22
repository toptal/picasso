import React from 'react'

import Select from '../Select'

const SelectDefaultExample = () => (
  <div>
    <Select
      onChange={handleChange}
      options={OPTIONS}
      placeholder='Choose your main skill...'
    />
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

const handleChange = e => {
  window.alert('Value of a chosen option is ' + e.target.value)
}

export default SelectDefaultExample
