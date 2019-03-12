import React from 'react'
import { Button, Icon, IconsLibrary } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const ButtonIconButtonsWithTextExample = () => (
  <div>
    <Button icon={<Icon name='cog' />}>Cog</Button>
    <Button icon={<Icon name='cog' />} iconPosition='right'>
      Check
    </Button>
  </div>
)

IconsLibrary.add(Cog)

export default ButtonIconButtonsWithTextExample
