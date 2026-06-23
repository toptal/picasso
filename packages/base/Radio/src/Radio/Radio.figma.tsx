import figma from '@figma/code-connect'
import React from 'react'
import { Radio } from '@toptal/picasso'

// Standalone Radio (no label)
figma.connect(
  Radio,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=245-11055',
  {
    props: {
      checked: figma.boolean('On'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ checked, disabled }) => (
      <Radio checked={checked} disabled={disabled} onChange={() => {}} />
    ),
  }
)

// Radio with label
figma.connect(
  Radio,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=245-11325',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ disabled }) => (
      <Radio label='Label' disabled={disabled} onChange={() => {}} />
    ),
  }
)
