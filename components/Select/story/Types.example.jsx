import React from 'react'
import { Select, Spacer } from '@toptal/picasso'

const SelectTypesExample = () => (
  <div>
    <Select options={OPTIONS} placeholder='Default...' />
    <Spacer inline right={2} />
    <Select options={OPTIONS} placeholder='Default...' variant='standard' />
    <Spacer inline right={2} />
    <Select native options={OPTIONS} placeholder='Native...' />
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default SelectTypesExample
