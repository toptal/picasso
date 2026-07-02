import figma from '@figma/code-connect'
import React from 'react'
import { Rating } from '@toptal/picasso'

figma.connect(
  Rating.Stars,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=66-368',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'large',
        Small: 'small',
      }),
      value: figma.enum('Rating', {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
      }),
    },
    example: ({ size, value }) => (
      <Rating.Stars name='rating' size={size} value={value} />
    ),
  }
)

figma.connect(
  Rating.Thumbs,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=66-470',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'large',
        Small: 'small',
      }),
    },
    example: ({ size }) => <Rating.Thumbs name='rating' size={size} />,
  }
)
