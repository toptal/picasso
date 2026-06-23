import figma from '@figma/code-connect'
import React from 'react'
import { Badge } from '@toptal/picasso'

const BADGE_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=60-45'

// Figma "Style" maps to React "variant": Primary → red, Secondary → white.

figma.connect(Badge, BADGE_URL, {
  props: {
    variant: figma.enum('Style', { Primary: 'red', Secondary: 'white' }),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
      Small: 'small',
    }),
  },
  example: ({ variant, size }) => (
    <Badge variant={variant} size={size} content={42} />
  ),
})
