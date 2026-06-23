import figma from '@figma/code-connect'
import React from 'react'
import { Alert } from '@toptal/picasso'
import { AlertInline } from '@toptal/picasso-alert'

const ALERT_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=13667-16196'

const sharedAlertProps = {
  variant: figma.enum('Color', {
    Red: 'red',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
  }),
  onClose: figma.boolean('Close Button', {
    true: () => {},
    false: undefined,
  }),
}

// No CTAs
figma.connect(Alert, ALERT_URL, {
  variant: { 'CTA Primary': 'false', 'CTA Secondary': 'false' },
  props: sharedAlertProps,
  example: ({ variant, onClose }) => (
    <Alert variant={variant} onClose={onClose}>
      Alert message
    </Alert>
  ),
})

// Primary CTA only
figma.connect(Alert, ALERT_URL, {
  variant: { 'CTA Primary': 'true', 'CTA Secondary': 'false' },
  props: sharedAlertProps,
  example: ({ variant, onClose }) => (
    <Alert
      variant={variant}
      onClose={onClose}
      actions={{ primary: { label: 'Primary Action', onClick: () => {} } }}
    >
      Alert message
    </Alert>
  ),
})

// Secondary CTA only
figma.connect(Alert, ALERT_URL, {
  variant: { 'CTA Primary': 'false', 'CTA Secondary': 'true' },
  props: sharedAlertProps,
  example: ({ variant, onClose }) => (
    <Alert
      variant={variant}
      onClose={onClose}
      actions={{ secondary: { label: 'Secondary Action', onClick: () => {} } }}
    >
      Alert message
    </Alert>
  ),
})

// Both CTAs
figma.connect(Alert, ALERT_URL, {
  variant: { 'CTA Primary': 'true', 'CTA Secondary': 'true' },
  props: sharedAlertProps,
  example: ({ variant, onClose }) => (
    <Alert
      variant={variant}
      onClose={onClose}
      actions={{
        primary: { label: 'Primary Action', onClick: () => {} },
        secondary: { label: 'Secondary Action', onClick: () => {} },
      }}
    >
      Alert message
    </Alert>
  ),
})

/**
 * Code Connect for Alert Inline (146:2482).
 */
figma.connect(
  AlertInline,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=146-2482',
  {
    props: {
      variant: figma.enum('Color', {
        Red: 'red',
        Yellow: 'yellow',
        Green: 'green',
        Blue: 'blue',
      }),
    },
    example: ({ variant }) => (
      <AlertInline variant={variant}>Alert message</AlertInline>
    ),
  }
)
