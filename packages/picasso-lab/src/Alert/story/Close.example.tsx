import React from 'react'
import { Alert } from '@toptal/picasso-lab'

const mockOnClose = () => {
  window.alert("You've clicked the close icon.")
}

const Example = () => (
  <Alert onClose={mockOnClose}>
    The time zone in your profile is set to (UTC-08:00) America - Los Angeles,
    but we’ve detected a change to (UTC-03:00) America - Cordoba.
  </Alert>
)

export default Example
