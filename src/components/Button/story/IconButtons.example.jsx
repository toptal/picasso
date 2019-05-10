import React from 'react'
import { Button } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const ButtonIconButtonsExample = () => (
  <div>
    <Button icon={<Cog />} size='small' />
    <Button icon={<Cog />} />
    <Button icon={<Cog />} size='large' />
  </div>
)

export default ButtonIconButtonsExample
