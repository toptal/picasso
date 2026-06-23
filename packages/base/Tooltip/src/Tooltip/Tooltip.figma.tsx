import figma from '@figma/code-connect'
import React from 'react'
import { Tooltip } from '@toptal/picasso'

figma.connect(
  Tooltip,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=78-141',
  {
    props: {
      placement: figma.enum('Position', {
        Bottom: 'bottom',
        Top: 'top',
        Right: 'right',
        Left: 'left',
      }),
    },
    example: ({ placement }) => (
      <Tooltip content='Tooltip text' placement={placement}>
        <span>Hover me</span>
      </Tooltip>
    ),
  }
)

figma.connect(
  Tooltip,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=72-4',
  {
    example: () => (
      <Tooltip content='Tooltip text' compact>
        <span>Hover me</span>
      </Tooltip>
    ),
  }
)
