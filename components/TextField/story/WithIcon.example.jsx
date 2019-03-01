import React from 'react'
import { TextField, IconsLibrary, Icon } from '@toptal/picasso'
import { Check } from '@toptal/picasso/Icons'

const TextFieldWithIconExample = () => (
  <div>
    <TextField Icon={<Icon name='check' />} label='Search...' />
  </div>
)

IconsLibrary.add(Check)

export default TextFieldWithIconExample
