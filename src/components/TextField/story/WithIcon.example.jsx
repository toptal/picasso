import React from 'react'
import { TextField } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const TextFieldWithIconExample = () => (
  <div>
    <TextField icon={<Cog />} placeholder='With icon' />
  </div>
)

export default TextFieldWithIconExample
