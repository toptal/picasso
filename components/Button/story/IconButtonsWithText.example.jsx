import React from 'react'
import { Button, Icon, IconsLibrary } from '@toptal/picasso'
import { Check } from '@toptal/picasso/Icons'

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
