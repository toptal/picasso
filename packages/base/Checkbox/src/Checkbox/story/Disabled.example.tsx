import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => (
  <Checkbox.Group>
    <Checkbox checked={false} disabled label='Unchecked' />
    <Checkbox checked disabled label='Checked' />
  </Checkbox.Group>
)

export default Example
