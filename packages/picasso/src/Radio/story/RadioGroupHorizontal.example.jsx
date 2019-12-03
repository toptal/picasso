import React, { useState } from 'react'
import { Radio } from '@toptal/picasso'

const RadioRadioGroupHorizontalExample = () => {
  const [value, setValue] = useState(null)

  return (
    <Radio.Group
      name='variableName'
      onChange={event => setValue(event.target.value)}
      horizontal
      value={value}
    >
      <Radio label='Radio 1' value='radio1' />
      <Radio label='Radio 2' value='radio2' />
      <Radio label='Radio 3' value='radio3' />
    </Radio.Group>
  )
}

export default RadioRadioGroupHorizontalExample
