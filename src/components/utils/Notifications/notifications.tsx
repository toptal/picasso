import React from 'react'
import { useSnackbar, OptionsObject, VariantType } from 'notistack'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'

import Notification, {
  VariantType as NotificationVariantType
} from '../../Notification'

const defaultNotificationPosition: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

export const useNotifications = (
  notificationPosition: SnackbarOrigin = defaultNotificationPosition
) => {
  const { enqueueSnackbar } = useSnackbar()

  const getNotification = (
    type: VariantType,
    variant?: NotificationVariantType
  ) => (text: string, options?: OptionsObject) =>
    enqueueSnackbar('', {
      variant: type,
      anchorOrigin: notificationPosition,
      children: (key: string) => (
        <Notification variant={variant} elevated key={key}>
          {text}
        </Notification>
      ),
      ...options
    })

  return {
    showError: getNotification('error', 'red'),
    showInformation: getNotification('info'),
    showWarning: getNotification('warning', 'yellow'),
    showSuccess: getNotification('success', 'green')
  }
}
