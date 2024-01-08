import { ApplicationUpdateNotification } from '../ApplicationUpdateNotification'
import { ApplicationUpdateNotificationActions } from '../ApplicationUpdateNotificationActions'

export const ApplicationUpdateNotificationCompound = Object.assign(
  ApplicationUpdateNotification,
  {
    Actions: ApplicationUpdateNotificationActions,
  }
)
