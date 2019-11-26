import React from 'react'
import { Notification, Container, Typography } from '@toptal/picasso'

const NotificationFullWidthExample = () => (
  <div>
    <Container bottom={1}>
      <Typography variant='heading' size='small'>
        Info
      </Typography>
    </Container>
    <Notification fullWidth variant='yellow'>
      The time zone in your profile is set to (UTC -08:00) America - Los
      Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
    </Notification>
  </div>
)

export default NotificationFullWidthExample
