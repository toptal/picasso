import React, { FunctionComponent } from 'react'
import { SnackbarProvider } from 'notistack'
import { usePageHeader } from '@toptal/picasso-shared'

import { headerHeight } from '../../TopBar/styles'

const MAX_NOTIFICATION_MESSAGES = 5

interface Props {
  /** Notification DOMNode for createPortal */
  container?: HTMLElement
}

const NotificationsProvider: FunctionComponent<Props> = ({
  children,
  container
}) => {
  const { hasPageHeader } = usePageHeader()

  return (
    <SnackbarProvider
      domRoot={container}
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      style={hasPageHeader ? { marginTop: headerHeight.default } : undefined}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
