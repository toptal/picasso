import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Switch } from '@toptal/picasso'

const Example = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <div style={{ height: 26 }}>
      <Switch
        checked={checked}
        onChange={handleChange}
        name='checkedA'
        label={checked ? 'Checked' : 'Unchecked'}
      />
    </div>
  )
}

export default Example
