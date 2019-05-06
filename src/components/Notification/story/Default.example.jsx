import React from 'react'
import { Notification, Typography } from '@toptal/picasso'

const NotificationDefaultExample = () => (
  <div>
    <Notification>
      <Typography variant='small'>
        The time zone in your profile is set to (UTC -08:00) America - Los
        Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
      </Typography>
    </Notification>
  </div>
)

export default NotificationDefaultExample
