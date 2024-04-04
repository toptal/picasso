import { Notification } from '../Notification'
import { NotificationActions } from '../NotificationActions'

type NotificationCompoundType = typeof Notification & {
  Actions: typeof NotificationActions
}

export const NotificationCompound: NotificationCompoundType = Object.assign(
  Notification,
  {
    Actions: NotificationActions,
  }
)
