import React, { FunctionComponent } from 'react'
import { SnackbarProvider } from 'notistack'

import { usePageHeader } from '../Picasso'

// --- need to move to shared config
export const headerHeight = { default: '4.5em', smallAndMedium: '3em' }

const MAX_NOTIFICATION_MESSAGES = 5

const NotificationsProvider: FunctionComponent = ({ children }) => {
  const { hasPageHeader } = usePageHeader()

  return (
    <SnackbarProvider
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      style={hasPageHeader ? { marginTop: headerHeight.default } : undefined}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
