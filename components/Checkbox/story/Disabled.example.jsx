import React from 'react'
import { Checkbox, Spacer } from '@toptal/picasso'

const CheckboxDisabledExample = () => (
  <div>
    <Checkbox checked={false} disabled label='Unchecked' />
    <Spacer bottom={1} />
    <Checkbox checked disabled label='Checked' />
  </div>
)

export default CheckboxDisabledExample
