import React, { FunctionComponent } from 'react'
import { SnackbarProvider } from 'notistack'
import { usePageHeader } from '@toptal/picasso-shared'

import { headerHeight } from '../../PageHeader/styles'

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
