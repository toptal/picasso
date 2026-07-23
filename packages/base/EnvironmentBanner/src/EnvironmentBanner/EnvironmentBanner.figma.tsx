import figma from '@figma/code-connect'
import React from 'react'
import { EnvironmentBanner } from '@toptal/picasso'

figma.connect(
  EnvironmentBanner,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=65-34',
  {
    props: {
      environment: figma.enum('Variant', {
        Development: 'development',
        Temploy: 'temploy',
        Staging: 'staging',
      }),
    },
    example: ({ environment }) => (
      <EnvironmentBanner environment={environment} productName='Picasso' />
    ),
  }
)
