import figma from '@figma/code-connect'
import React from 'react'
import { Indicator } from '@toptal/picasso'

figma.connect(
  Indicator,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=65-74',
  {
    props: {
      color: figma.enum('Color', {
        Negative: 'red',
        Warning: 'yellow',
        Primary: 'blue',
        Positive: 'green',
        Secondary: 'grey-darker',
        'Light Blue': 'light-blue',
      }),
    },
    example: ({ color }) => <Indicator color={color} />,
  }
)
