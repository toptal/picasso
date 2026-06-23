import figma from '@figma/code-connect'
import React from 'react'
import { Switch } from '@toptal/picasso'

figma.connect(
  Switch,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=172-2265',
  {
    props: {
      checked: figma.boolean('On'),
      disabled: figma.enum('State', {
        Disabled: true,
        Enabled: false,
        'Hover & Focus': false,
      }),
    },
    example: ({ checked, disabled }) => (
      <Switch checked={checked} disabled={disabled} onChange={() => {}} />
    ),
  }
)
