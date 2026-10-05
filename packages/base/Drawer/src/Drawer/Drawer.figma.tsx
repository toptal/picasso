import figma from '@figma/code-connect'
import React from 'react'
import { Drawer } from '@toptal/picasso'

figma.connect(
  Drawer,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=344-13179',
  {
    example: () => (
      <Drawer open title='Drawer title' onClose={() => {}}>
        Drawer content
      </Drawer>
    ),
  }
)

figma.connect(
  Drawer,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12346-39116',
  {
    props: {
      width: figma.enum('Size', {
        Narrow: 'narrow',
        Regular: 'regular',
        Medium: 'medium',
        Wide: 'wide',
        'Ultra Wide': 'ultra-wide',
      }),
    },
    example: ({ width }) => (
      <Drawer open title='Drawer title' width={width} onClose={() => {}}>
        Drawer content
      </Drawer>
    ),
  }
)

figma.connect(
  Drawer,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12346-38754',
  {
    example: () => (
      <Drawer open title='Drawer title' onClose={() => {}}>
        Drawer content
      </Drawer>
    ),
  }
)

figma.connect(
  Drawer,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=14759-2666',
  {
    example: () => (
      <Drawer open title='Drawer title' onClose={() => {}}>
        Drawer content
      </Drawer>
    ),
  }
)
