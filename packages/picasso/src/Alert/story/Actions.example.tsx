import React from 'react'
import { Alert } from '@toptal/picasso'

const mockOnClose = () => {
  window.alert('Close icon')
}

const actions = {
  primary: {
    onClick: () => window.alert('Primary action button'),
    label: 'Primary',
  },
  secondary: {
    onClick: () => window.alert('Secondary action button'),
    label: 'Secondary',
  },
}

const Example = () => (
  <Alert onClose={mockOnClose} actions={actions}>
    This is a warning alert with actions
  </Alert>
)

export default Example
