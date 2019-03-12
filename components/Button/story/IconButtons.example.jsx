import React from 'react'
import { Button, Icon, IconsLibrary } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const ButtonIconButtonsExample = () => (
  <div>
    <Button icon={<Icon name='cog' />} size='small' />
    <Button icon={<Icon name='cog' />} />
    <Button icon={<Icon name='cog' />} size='large' />
  </div>
)

IconsLibrary.add(Cog)

export default ButtonIconButtonsExample
