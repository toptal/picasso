import type { ReactNode, ReactElement } from 'react'
import React, { forwardRef, useMemo, useCallback } from 'react'
import type { OptionsObject } from 'notistack'
import { useSnackbar } from 'notistack'
import type { SnackbarOrigin } from '@material-ui/core/Snackbar'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin } from 'tailwind-merge'

import type { VariantType } from '../Notification'
import { Notification as PicassoNotification } from '../Notification'

const defaultPosition: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right',
}

interface Props extends BaseProps {
  key?: string
  content: ReactNode
  icon?: ReactElement
  onClose?: () => void
  variant?: VariantType
}

const StyledNotification =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, Props>(function Notification(props, ref) {
    const { content, icon, key, onClose, variant = 'white' } = props

    return (
      <PicassoNotification
        variant={variant}
        elevated
        icon={icon}
        key={key}
        onClose={onClose}
        className={twJoin(
          'max-w-full',
          variant === 'white' ? 'w-[27.5em]' : `w-[20em]`
        )}
        ref={ref}
      >
        {content}
      </PicassoNotification>
    )
  })

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const getNotification = useCallback(
    () =>
      (notificationElement: React.ReactElement, options?: OptionsObject) => {
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
              onClose: closeNotification,
            }),
          ...options,
        })

        return notificationId
      },
    [closeSnackbar, enqueueSnackbar]
  )

  const getPicassoNotification = useCallback(
    (variant?: VariantType) =>
      (content: ReactNode, icon?: ReactElement, options?: OptionsObject) => {
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
    showError: useMemo(
      () => getPicassoNotification('red'),
      [getPicassoNotification]
    ),
    showInfo: useMemo(() => getPicassoNotification(), [getPicassoNotification]),
    showSuccess: useMemo(
      () => getPicassoNotification('green'),
      [getPicassoNotification]
    ),
    showCustom: useMemo(() => getNotification(), [getNotification]),
    closeNotification: closeSnackbar,
  }
}
