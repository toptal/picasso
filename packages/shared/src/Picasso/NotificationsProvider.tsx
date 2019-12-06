import { SnackbarProvider } from 'notistack'
import React, { FunctionComponent } from 'react'

import { usePageHeader } from '../Picasso'

// --- need to move to shared config
export const headerHeight = { default: '4.5em', smallAndMedium: '3em' }

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
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      domRoot={container}
      style={hasPageHeader ? { marginTop: headerHeight.default } : undefined}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
