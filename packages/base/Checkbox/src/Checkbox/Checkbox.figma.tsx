import figma from '@figma/code-connect'
import React from 'react'
import { Checkbox } from '@toptal/picasso'

figma.connect(
  Checkbox,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=245-11069',
  {
    props: {
      checked: figma.enum('On', { True: true }),
      disabled: figma.enum('State', { Disabled: true }),
      indeterminate: figma.enum('State', { Indeterminate: true }),
    },
    example: ({ checked, disabled, indeterminate }) => (
      <Checkbox
        checked={checked}
        disabled={disabled}
        indeterminate={indeterminate}
        onChange={() => {}}
      />
    ),
  }
)

figma.connect(
  Checkbox,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=245-11326',
  {
    props: {
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ disabled }) => (
      <Checkbox label='Label' disabled={disabled} onChange={() => {}} />
    ),
  }
)
