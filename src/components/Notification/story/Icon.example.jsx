import React from 'react'
import { Notification, Github } from '@toptal/picasso'

const NotificationIconExample = () => (
  <div>
    <Notification icon={<Github />}>
      The time zone in your profile is set to (UTC -08:00) America - Los
      Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
    </Notification>
  </div>
)

export default NotificationIconExample
