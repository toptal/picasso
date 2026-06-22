import React from 'react'
import figma from '@figma/code-connect'

import { Button } from './Button'

// Node 16828:7595 — "Button" component set in Product-Library-v2.0.
// Figma "Type" maps to React "variant" (Danger → 'negative').
// Figma "State=Loader" maps to loading=true; "State=Disabled" maps to disabled=true.
// Other states (Enabled, Focus, Hover, Active, Success) are visual only — no React prop.

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
