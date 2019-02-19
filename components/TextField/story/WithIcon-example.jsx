import React from 'react'

import TextField from '../TextField'
import IconsLibrary from '../../Icons/IconsLibrary'
import Icon from '../../Icons/Icon'
import Check from '../../Icons/Check'

const TextFieldWithIconExample = () => (
  <div>
    <TextField Icon={<Icon name='check' />} label='Search...' />
  </div>
)

IconsLibrary.add(Check)

export default TextFieldWithIconExample
