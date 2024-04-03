import { ApplicationUpdateNotification } from '../ApplicationUpdateNotification'
import { ApplicationUpdateNotificationActions } from '../ApplicationUpdateNotificationActions'

type ApplicationUpdateNotificationCompoundType =
  typeof ApplicationUpdateNotification & {
    Actions: typeof ApplicationUpdateNotificationActions
  }

export const ApplicationUpdateNotificationCompound: ApplicationUpdateNotificationCompoundType =
  Object.assign(ApplicationUpdateNotification, {
    Actions: ApplicationUpdateNotificationActions,
  })
