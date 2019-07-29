import React from 'react'
import {
  useSnackbar,
  OptionsObject,
  VariantType as NotificationType
} from 'notistack'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'

import Notification, { VariantType } from '../../Notification'

const defaultPosition: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

export const useNotifications = (
  position: SnackbarOrigin = defaultPosition
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const getNotification = (type: NotificationType, variant?: VariantType) => (
    text: string,
    options?: OptionsObject
  ) =>
    enqueueSnackbar('', {
      variant: type,
      anchorOrigin: position,
      // eslint-disable-next-line react/display-name
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
    showSuccess: getNotification('success', 'green'),
    closeNotification: closeSnackbar
  }
}
