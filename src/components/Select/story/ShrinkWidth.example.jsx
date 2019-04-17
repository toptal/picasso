import React from 'react'
import { Select } from '@toptal/picasso'

const SelectShrinkWidthExample = () => (
  <div>
    <Select width='shrink' options={OPTIONS} placeholder='ID' />
  </div>
)

const OPTIONS = [
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' },
  { value: 4, text: '4' }
]

export default SelectShrinkWidthExample
