import React from 'react'
import { Notification, Github16 } from '@toptal/picasso'

const Example = () => (
  <div>
    <Notification icon={<Github16 />}>
      The time zone in your profile is set to (UTC -08:00) America - Los
      Angeles, but we’ve detected a change to (UTC -03:00) America - Cordoba.
    </Notification>
  </div>
)

export default Example
