import React from 'react'

import Button from '../Button'
import IconsLibrary from '../../Icons/IconsLibrary'
import Icon from '../../Icons/Icon'
import Check from '../../Icons/Check'

const ButtonIconButtonsExample = () => (
  <div>
    <Button icon={<Icon name='check' />} size='small' />
    <Button icon={<Icon name='check' />} />
    <Button icon={<Icon name='check' />} size='large' />
  </div>
)

IconsLibrary.add(Check)

export default ButtonIconButtonsExample
