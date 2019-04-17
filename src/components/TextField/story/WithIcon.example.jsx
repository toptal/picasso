import React from 'react'
import { TextField } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const TextFieldWithIconExample = () => (
  <div>
    <TextField icon={<Cog />} label='Search...' />
  </div>
)

export default TextFieldWithIconExample
