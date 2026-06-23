import figma from '@figma/code-connect'
import React from 'react'
import { Button } from '@toptal/picasso'

figma.connect(
  Button,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=16828-7595',
  {
    props: {
      variant: figma.enum('Type', {
        Primary: 'primary',
        Secondary: 'secondary',
        Positive: 'positive',
        Danger: 'negative',
        Transparent: 'transparent',
      }),
      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      loading: figma.enum('State', {
        Loader: true,
      }),
      children: figma.textContent('Button'),
    },
    example: ({ variant, size, disabled, loading, children }) => (
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
      >
        {children}
      </Button>
    ),
  }
)
