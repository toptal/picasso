/* eslint-disable import/no-extraneous-dependencies */
import ApplicationUpdateNotification from '@toptal/picasso-application-update-notification'
import ApplicationUpdateNotificationActions from '@toptal/picasso-application-update-notification-actions'

export const ApplicationUpdateNotificationCompound = Object.assign(
  ApplicationUpdateNotification,
  {
    Actions: ApplicationUpdateNotificationActions,
  }
)
