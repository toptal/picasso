import React from 'react'
import { Notification, Link } from '@toptal/picasso'

const Example = () => (
  <div>
    <Notification>
      The time zone in your profile is set to (UTC -08:00) America - Los
      <Notification.Actions>
        <Link href='#'>Change</Link>
      </Notification.Actions>
    </Notification>
  </div>
)

export default Example
