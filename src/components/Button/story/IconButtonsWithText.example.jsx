import React from 'react'
import { Button } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const ButtonIconButtonsWithTextExample = () => (
  <div>
    <Button icon={<Cog />}>Cog</Button>
    <Button icon={<Cog />} iconPosition='right'>
      Check
    </Button>
  </div>
)

export default ButtonIconButtonsWithTextExample
