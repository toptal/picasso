import figma from '@figma/code-connect'
import React from 'react'
import { Helpbox } from '@toptal/picasso'

const HELPBOX_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=14636-2085'

figma.connect(Helpbox, HELPBOX_URL, {
  props: {
    variant: figma.enum('Color', {
      Gray: 'grey',
      Green: 'green',
      Yellow: 'yellow',
      Red: 'red',
      Blue: 'blue',
      White: 'white',
    }),
  },
  example: ({ variant }) => (
    <Helpbox variant={variant}>
      <Helpbox.Title>Title</Helpbox.Title>
      <Helpbox.Content>Content</Helpbox.Content>
    </Helpbox>
  ),
})
