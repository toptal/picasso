import figma from '@figma/code-connect'
import React from 'react'
import { Avatar } from '@toptal/picasso-avatar'

const AVATAR_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=463-15416'

// Figma "Style" and "Gender" are design sample properties; they have no React prop equivalent.
// Figma "⚠️ 24px" size is deprecated/unsupported — omitted from the enum mapping.
// Size mapping: 32px → xxsmall, 40px → xsmall, 80px → small, 120px → medium, 160px → large.

figma.connect(Avatar, AVATAR_URL, {
  props: {
    size: figma.enum('Size', {
      '32px': 'xxsmall',
      '40px': 'xsmall',
      '80px': 'small',
      '120px': 'medium',
      '160px': 'large',
    }),
  },
  example: ({ size }) => (
    <Avatar size={size} src='https://example.com/avatar.jpg' name='John Doe' />
  ),
})
