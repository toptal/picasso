import figma from '@figma/code-connect'
import React from 'react'
import { Dropzone } from '@toptal/picasso'

figma.connect(
  Dropzone,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=3474-16335',
  {
    props: {
      disabled: figma.enum('State', { Disabled: true }),
    },
    example: ({ disabled }) => <Dropzone disabled={disabled} />,
  }
)
