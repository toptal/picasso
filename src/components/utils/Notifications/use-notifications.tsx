import React, { ReactNode, ReactElement } from 'react'
import cx from 'classnames'
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

interface Props {
  key: string
  content: ReactNode
  icon?: ReactElement
  classes: Classes
  onClose?: () => void
  variant?: VariantType
}

const StyledNotification = withStyles(styles)(
  ({ content, icon, key, onClose, variant = 'white', classes }: Props) => (
    <Notification
      variant={variant}
      elevated
      icon={icon}
      key={key}
      onClose={onClose}
      className={cx({
        [classes.generalNotification]: variant === 'white',
        [classes.formNotification]: variant !== 'white'
      })}
    >
      {content}
    </Notification>
  )
)

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const getNotification = (variant?: VariantType) => (
    content: ReactNode,
    icon?: ReactElement,
    options?: OptionsObject
  ) => {
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
          icon={icon}
          key={key}
          variant={variant}
          onClose={closeNotification}
        />
      ),
      ...options
    })

    return notificationId
  }

  const showCustomNotification = (
    Content: ReactElement,
    position?: SnackbarOrigin,
    options?: OptionsObject
  ) =>
    enqueueSnackbar('', {
      anchorOrigin: position || defaultPosition,
      // eslint-disable-next-line react/display-name
      children: (key: string) => React.cloneElement(Content, { key }),
      ...options
    })

  return {
    showError: getNotification('red'),
    showInfo: getNotification(),
    showSuccess: getNotification('green'),
    showCustomNotification: showCustomNotification,
    closeNotification: closeSnackbar
  }
}
