import React from 'react'
import { TextField, IconsLibrary, Icon } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const TextFieldWithIconExample = () => (
  <div>
    <TextField icon={<Icon name='cog' />} label='Search...' />
  </div>
)

IconsLibrary.add(Cog)

export default TextFieldWithIconExample
