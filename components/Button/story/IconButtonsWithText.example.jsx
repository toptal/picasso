import React from 'react'

import Button from '../Button'
import IconsLibrary from '../../Icons/IconsLibrary'
import Icon from '../../Icons/Icon'
import Check from '../../Icons/Check'

const ButtonIconButtonsWithTextExample = () => (
  <div>
    <Button icon={<Icon name='check' />}>Check</Button>
    <Button icon={<Icon name='check' />} iconPosition='right'>
      Check
    </Button>
  </div>
)

IconsLibrary.add(Check)

export default ButtonIconButtonsWithTextExample
