import figma from '@figma/code-connect'
import React from 'react'
import { List } from '@toptal/picasso'

figma.connect(
  List.Item,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=155-2165',
  {
    props: {
      variant: figma.enum('Style', {
        'Unordered (Bullet)': 'unordered',
        'Unordered (Circle)': 'unordered',
        'Unordered (Checkmark)': 'unordered',
        'Unordered (Arrow)': 'unordered',
        'Ordered (Cardinal)': 'ordered',
        'Ordered (Letter)': 'ordered',
        'Ordered (Roman)': 'ordered',
      }),
    },
    example: ({ variant }) => (
      <List variant={variant}>
        <List.Item>List item one</List.Item>
        <List.Item>List item two</List.Item>
        <List.Item>List item three</List.Item>
      </List>
    ),
  }
)
