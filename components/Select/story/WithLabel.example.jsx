import React from 'react'
import { Select } from '@toptal/picasso'

const WithLabelLabelExample = () => (
  <div>
    <Select label='Choose your main skill:' options={OPTIONS} width='auto' />
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default WithLabelLabelExample
