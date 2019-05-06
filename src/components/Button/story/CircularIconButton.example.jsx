import React from 'react'
import { Button } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const ButtonIconButtonsExample = () => (
  <div>
    <Button icon={<Cog />} circular size='small' />
    <Button icon={<Cog />} circular />
    <Button icon={<Cog />} circular size='large' />
  </div>
)

export default ButtonIconButtonsExample
