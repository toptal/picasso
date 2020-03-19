import React, { ReactNode, ReactElement, forwardRef, useMemo } from 'react'
import cx from 'classnames'
import { useSnackbar, OptionsObject } from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import { Classes } from '@toptal/picasso-shared'

import PicassoNotification, { VariantType } from '../../Notification'
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
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLElement, Props>(function Notification(
    { content, icon, key, onClose, variant = 'white', classes },
    ref
  ) {
    return (
      <PicassoNotification
        variant={variant}
        elevated
        icon={icon}
        key={key}
        onClose={onClose}
        className={cx({
          [classes.generalNotification]: variant === 'white',
          [classes.formNotification]: variant !== 'white'
        })}
        ref={ref}
      >
        {content}
      </PicassoNotification>
    )
  })
)

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return useMemo(() => {
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
        content: (key: string) => (
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
  }, [closeSnackbar, enqueueSnackbar])
}
