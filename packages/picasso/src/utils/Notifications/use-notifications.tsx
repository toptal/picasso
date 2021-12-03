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
  key?: string
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
    () => (
      notificationElement: React.ReactElement,
      options?: OptionsObject
    ) => {
      const closeNotification = () => {
        if (!notificationId) {
          return
        }

        closeSnackbar(notificationId)

        if (notificationElement.props.onClose) {
          notificationElement.props.onClose()
        }
      }
      const notificationId = enqueueSnackbar('', {
        anchorOrigin: defaultPosition,
        content: (key: string) =>
          React.cloneElement(notificationElement, {
            key,
            onClose: closeNotification
          }),
        ...options
      })

      return notificationId
    },
    [closeSnackbar, enqueueSnackbar]
  )

  const getPicassoNotification = useCallback(
    (variant?: VariantType) => (
      content: ReactNode,
      icon?: ReactElement,
      options?: OptionsObject
    ) => {
      const notificationComponent = (
        <StyledNotification content={content} icon={icon} variant={variant} />
      )
      const showNotificaiton = getNotification()
      const notificationId = showNotificaiton(notificationComponent, options)

      return notificationId
    },
    [getNotification]
  )

  return {
    showError: useMemo(() => getPicassoNotification('red'), [
      getPicassoNotification
    ]),
    showInfo: useMemo(() => getPicassoNotification(), [getPicassoNotification]),
    showSuccess: useMemo(() => getPicassoNotification('green'), [
      getPicassoNotification
    ]),
    showCustom: useMemo(() => getNotification(), [getNotification]),
    closeNotification: closeSnackbar
  }
}
