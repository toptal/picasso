import React from 'react'

import Checkbox from '../Checkbox'
import Spacer from '../../Spacer'

const CheckboxControlledExample = () => (
  <div>
    <Checkbox checked={false} id='checkbox-unchecked' label='Unchecked' />
    <Spacer bottom={1} />
    <Checkbox checked id='checkbox-checked' label='Checked' />
  </div>
)

export default CheckboxControlledExample
