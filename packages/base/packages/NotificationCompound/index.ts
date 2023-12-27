/* eslint-disable import/no-extraneous-dependencies */
import Notification from '@toptal/picasso-notification'
import NotificationActions from '@toptal/picasso-notification-actions'

export const NotificationCompound = Object.assign(Notification, {
  Actions: NotificationActions,
})
