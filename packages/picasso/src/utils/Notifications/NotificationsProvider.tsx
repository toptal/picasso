import React from 'react'
import { SnackbarProvider } from 'notistack'
import { usePageTopBar } from '@toptal/picasso-provider'

import { headerHeight } from '../../PageTopBar/styles'

const MAX_NOTIFICATION_MESSAGES = 5

interface Props {
  /** Notification DOMNode for createPortal */
  container?: HTMLElement
}

const NotificationsProvider = ({ children, container }: Props) => {
  const { hasTopBar } = usePageTopBar()

  return (
    <SnackbarProvider
      domRoot={container}
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      style={hasTopBar ? { marginTop: headerHeight.default } : undefined}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
