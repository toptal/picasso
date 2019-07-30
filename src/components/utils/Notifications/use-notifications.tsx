import React, { ReactNode } from 'react'
import {
  useSnackbar,
  OptionsObject,
  VariantType as NotificationType
} from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'

import Notification, { VariantType } from '../../Notification'
import { Classes } from '../../styles/types'
import styles from './styles'

const defaultPosition: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

type Options = OptionsObject & {
  dismissible?: boolean
}

interface Props {
  key: string
  content: string | ReactNode
  classes: Classes
  onClose?: () => void
  variant?: VariantType
}

const StyledNotification = withStyles(styles)(
  ({ content, key, onClose, variant, classes }: Props) => (
    <Notification
      variant={variant}
      elevated
      key={key}
      onClose={onClose}
      className={classes.notification}
    >
      {content}
    </Notification>
  )
)

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const getNotification = (type: NotificationType, variant?: VariantType) => (
    content: string | ReactNode,
    options: Options = {}
  ) => {
    const { dismissible = true, ...restOptions } = options
    const notificationId = enqueueSnackbar('', {
      variant: type,
      anchorOrigin: defaultPosition,
      // eslint-disable-next-line react/display-name
      children: (key: string) => (
        <StyledNotification
          content={content}
          key={key}
          variant={variant}
          onClose={
            dismissible
              ? () => {
                  notificationId && closeSnackbar(notificationId)
                }
              : undefined
          }
        />
      ),
      ...restOptions
    })

    return notificationId
  }

  return {
    showError: getNotification('error', 'red'),
    showInfo: getNotification('info'),
    showWarning: getNotification('warning', 'yellow'),
    showSuccess: getNotification('success', 'green'),
    closeNotification: closeSnackbar
  }
}
