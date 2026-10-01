import figma from '@figma/code-connect'
import React from 'react'
import { Calendar } from '@toptal/picasso'

figma.connect(
  Calendar,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=2966-15681',
  {
    example: () => <Calendar onChange={() => {}} />,
  }
)

figma.connect(
  Calendar,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=2978-15508',
  {
    example: () => (
      <Calendar disableDays={{ dayOfWeek: [0, 6] }} onChange={() => {}} />
    ),
  }
)
