import React from 'react'
import { Notification, Container, Typography } from '@toptal/picasso'

const mockOnClose = () => {
  window.alert("You've clicked the close icon.")
}

const NotificationCloseExample = () => (
  <div>
    <Container bottom={1}>
      <Typography variant='h4'>Info</Typography>
    </Container>
    <Notification onClose={mockOnClose} variant='warning'>
      <Typography variant='small'>
        The time zone in your profile is set to (UTC -08:00) America - Los
        Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
      </Typography>
    </Notification>
  </div>
)

export default NotificationCloseExample
