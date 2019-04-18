import React from 'react'
import { Checkbox, Container } from '@toptal/picasso'

const CheckboxControlledExample = () => (
  <div>
    <Container bottom={1}>
      <Checkbox checked={false} id='checkbox-unchecked' label='Unchecked' />
    </Container>
    <Checkbox checked id='checkbox-checked' label='Checked' />
  </div>
)

export default CheckboxControlledExample
