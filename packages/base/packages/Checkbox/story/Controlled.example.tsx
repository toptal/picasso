import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => (
  <Checkbox.Group>
    <Checkbox checked={false} id='checkbox-unchecked' label='Unchecked' />
    <Checkbox checked id='checkbox-checked' label='Checked' />
  </Checkbox.Group>
)

export default Example
