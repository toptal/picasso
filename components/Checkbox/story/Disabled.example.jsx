import React from 'react'
import { Checkbox, Container } from '@toptal/picasso'

const CheckboxDisabledExample = () => (
  <div>
    <Container bottom={1}>
      <Checkbox checked={false} disabled label='Unchecked' />
    </Container>
    <Checkbox checked disabled label='Checked' />
  </div>
)

export default CheckboxDisabledExample
