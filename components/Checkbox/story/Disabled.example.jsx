import React from 'react'

import Checkbox from '../Checkbox'
import Spacer from '../../Spacer'

const CheckboxDisabledExample = () => (
  <div>
    <Checkbox checked={false} disabled label='Unchecked' />
    <Spacer bottom={1} />
    <Checkbox checked disabled label='Checked' />
  </div>
)

export default CheckboxDisabledExample
