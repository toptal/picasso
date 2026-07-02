import figma from '@figma/code-connect'
import React from 'react'
import { Accordion } from '@toptal/picasso'

const ACCORDION_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=82-100'

// Figma has 4 border variants; React has 3.
// "With Bottom Border" and "With Top Border" both map to 'middle' (partial borders).

figma.connect(Accordion, ACCORDION_URL, {
  props: {
    expanded: figma.enum('Expanded', { True: true, False: false }),
    borders: figma.enum('Borders', {
      'No Borders': 'none',
      'With Borders': 'all',
      'With Bottom Border': 'middle',
      'With Top Border': 'middle',
    }),
  },
  example: ({ expanded, borders }) => (
    <Accordion
      expanded={expanded}
      borders={borders}
      content={<Accordion.Details>Content goes here.</Accordion.Details>}
    >
      <Accordion.Summary>Summary</Accordion.Summary>
    </Accordion>
  ),
})
