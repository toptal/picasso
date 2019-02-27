import React from 'react'
import { Checkbox, Spacer } from '@toptal/picasso'

const CheckboxControlledExample = () => (
  <div>
    <Checkbox checked={false} id='checkbox-unchecked' label='Unchecked' />
    <Spacer bottom={1} />
    <Checkbox checked id='checkbox-checked' label='Checked' />
  </div>
)

export default CheckboxControlledExample
