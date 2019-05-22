import React from 'react'
import { Select, Container } from '@toptal/picasso'

const SelectTypesExample = () => (
  <div>
    <Container inline right='large'>
      <Select options={OPTIONS} placeholder='Default...' width='auto' />
    </Container>
    <Select native options={OPTIONS} placeholder='Native...' width='auto' />
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default SelectTypesExample
