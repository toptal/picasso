import figma from '@figma/code-connect'
import React from 'react'
import { Container } from '@toptal/picasso-container'

figma.connect(
  Container,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=139-2234',
  {
    props: {
      variant: figma.enum('Color', {
        Blue: 'blue',
        // Figma calls it "Gray", React uses 'grey'
        Gray: 'grey',
        Green: 'green',
        Red: 'red',
        White: 'white',
        Yellow: 'yellow',
      }),
    },
    example: ({ variant }) => <Container variant={variant}>Content</Container>,
  }
)
