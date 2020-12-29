import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => {
  return (
    <Checkbox.Group horizontal>
      <Checkbox label='Checkbox 1' value='checkbox1' />
      <Checkbox label='Checkbox 2' value='checkbox2' />
      <Checkbox label='Checkbox 3' value='checkbox3' />
    </Checkbox.Group>
  )
}

export default Example
