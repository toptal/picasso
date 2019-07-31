import React, { ReactNode } from 'react'
import { useSnackbar, OptionsObject } from 'notistack'
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
  content: ReactNode
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

  const getNotification = (variant?: VariantType) => (
    content: ReactNode,
    options: Options = {}
  ) => {
    const { dismissible = true, ...restOptions } = options
    const closeNotification = () => {
      if (!notificationId) {
        return
      }

      closeSnackbar(notificationId)
    }
    const notificationId = enqueueSnackbar('', {
      anchorOrigin: defaultPosition,
      // eslint-disable-next-line react/display-name
      children: (key: string) => (
        <StyledNotification
          content={content}
          key={key}
          variant={variant}
          onClose={dismissible ? closeNotification : undefined}
        />
      ),
      ...restOptions
    })

    return notificationId
  }

  return {
    showError: getNotification('red'),
    showInfo: getNotification(),
    showWarning: getNotification('yellow'),
    showSuccess: getNotification('green'),
    closeNotification: closeSnackbar
  }
}
