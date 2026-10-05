import figma from '@figma/code-connect'
import React from 'react'
import { ProgressBar } from '@toptal/picasso'

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=180-3737',
  {
    props: {
      showPercentage: figma.boolean('Show %'),
    },
    example: ({ showPercentage }) => (
      <ProgressBar value={50} showPercentage={showPercentage} />
    ),
  }
)
