import React, { useState } from 'react'
import { Radio } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Radio.Group
      name='variableName'
      onChange={(event: React.ChangeEvent<{ value: string }>) =>
        setValue(event.target.value)
      }
      horizontal
      value={value}
    >
      <Radio label='Radio 1' value='radio1' />
      <Radio label='Radio 2' value='radio2' />
      <Radio label='Radio 3' value='radio3' />
    </Radio.Group>
  )
}

export default Example
