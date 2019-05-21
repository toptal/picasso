import React from 'react'
import { TextField } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const TextFieldWithIconExample = () => (
  <div>
    <TextField icon={<Cog />} placeholder='With icon' />
    <TextField icon={<Cog />} iconPosition='end' placeholder='With icon' />
    <TextField icon={<Cog />} disabled placeholder='With icon' />
    <TextField icon={<Cog />} disabled value='With icon' />
    <TextField icon={<Cog />} error value='With icon' />
  </div>
)

export default TextFieldWithIconExample
