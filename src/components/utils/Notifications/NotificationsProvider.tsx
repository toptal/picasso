import React, { FunctionComponent } from 'react'
import { SnackbarProvider } from 'notistack'

import { useHasPageHeader } from '../../Picasso'
import { headerHeight } from '../../PageHeader/styles'

const MAX_NOTIFICATION_MESSAGES = 5

const NotificationsProvider: FunctionComponent = ({ children }) => {
  const { hasPageHeader } = useHasPageHeader()

  return (
    <SnackbarProvider
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      style={hasPageHeader ? { marginTop: headerHeight } : undefined}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
