import React from 'react'
import { Notification, Container, Typography } from '@toptal/picasso'

const mockOnClose = () => {
  window.alert("You've clicked the close icon.")
}

const Example = () => (
  <div>
    <Container bottom={1}>
      <Typography variant='heading' size='small'>
        Info
      </Typography>
    </Container>
    <Notification onClose={mockOnClose}>
      The time zone in your profile is set to (UTC -08:00) America - Los
      Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
    </Notification>
  </div>
)

export default Example
