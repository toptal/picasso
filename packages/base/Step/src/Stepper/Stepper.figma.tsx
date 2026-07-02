import figma from '@figma/code-connect'
import React from 'react'
import { Stepper } from '@toptal/picasso'

figma.connect(
  Stepper,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=180-3409',
  {
    props: {
      hideLabels: figma.boolean('All Labels', {
        true: false,
        false: true,
      }),
    },
    example: ({ hideLabels }) => (
      <Stepper
        active={1}
        hideLabels={hideLabels}
        steps={['Step 1', 'Step 2', 'Step 3']}
      />
    ),
  }
)
