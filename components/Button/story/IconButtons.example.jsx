import React from 'react'
import { Button, Icon, IconsLibrary } from '@toptal/picasso'
import { Check } from '@toptal/picasso/Icons'

const ButtonIconButtonsExample = () => (
  <div>
    <Button icon={<Icon name='check' />} size='small' />
    <Button icon={<Icon name='check' />} />
    <Button icon={<Icon name='check' />} size='large' />
  </div>
)

IconsLibrary.add(Check)

export default ButtonIconButtonsExample
