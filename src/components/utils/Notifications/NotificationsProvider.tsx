import React, { FunctionComponent } from 'react'
import { SnackbarProvider } from 'notistack'

import { headerHeight } from '../../PageHeader/styles'

const MAX_NOTIFICATION_MESSAGES = 5

interface Props {
  isHeaderMargin?: boolean
}

const NotificationsProvider: FunctionComponent<Props> = ({
  children,
  isHeaderMargin
}) => (
  <SnackbarProvider
    maxSnack={MAX_NOTIFICATION_MESSAGES}
    style={isHeaderMargin ? { marginTop: headerHeight } : undefined}
  >
    {children}
  </SnackbarProvider>
)

NotificationsProvider.defaultProps = {
  isHeaderMargin: true
}

export default NotificationsProvider
