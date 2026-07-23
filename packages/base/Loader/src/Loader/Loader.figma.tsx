import figma from '@figma/code-connect'
import React from 'react'
import { Loader } from '@toptal/picasso'

figma.connect(
  Loader,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=9669-33974',
  {
    props: {
      size: figma.enum('Size', {
        '16px': 'small',
        '32px': 'medium',
        '64px': 'large',
      }),
    },
    example: ({ size }) => <Loader size={size} />,
  }
)
