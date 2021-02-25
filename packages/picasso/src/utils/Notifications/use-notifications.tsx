import React, {
  ReactNode,
  ReactElement,
  forwardRef,
  useMemo,
  useCallback
} from 'react'
import cx from 'classnames'
import { useSnackbar, OptionsObject } from 'notistack'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import { BaseProps } from '@toptal/picasso-shared'

import {
  Notification as PicassoNotification,
  VariantType
} from '../../Notification'
import styles from './styles'

const defaultPosition: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right'
}

interface Props extends BaseProps {
  key: string
  content: ReactNode
  icon?: ReactElement
  onClose?: () => void
  variant?: VariantType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNotification'
})

const StyledNotification =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLElement, Props>(function Notification(props, ref) {
    const { content, icon, key, onClose, variant = 'white' } = props
    const classes = useStyles()

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

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const getNotification = useCallback(
    (variant?: VariantType) => (
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
    },
    [closeSnackbar, enqueueSnackbar]
  )

  return {
    showError: useMemo(() => getNotification('red'), [getNotification]),
    showInfo: useMemo(() => getNotification(), [getNotification]),
    showSuccess: useMemo(() => getNotification('green'), [getNotification]),
    closeNotification: closeSnackbar
  }
}
