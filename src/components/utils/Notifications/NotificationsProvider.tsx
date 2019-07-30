import React, { FunctionComponent } from 'react'
import { SnackbarProvider } from 'notistack'

import { headerHeight } from '../../PageHeader/styles'

const MAX_NOTIFICATION_MESSAGES = 5

interface Props {
  hasHeaderMargin?: boolean
}

const NotificationsProvider: FunctionComponent<Props> = ({
  children,
  hasHeaderMargin
}) => (
  <SnackbarProvider
    maxSnack={MAX_NOTIFICATION_MESSAGES}
    style={hasHeaderMargin ? { marginTop: headerHeight } : undefined}
  >
    {children}
  </SnackbarProvider>
)

NotificationsProvider.defaultProps = {
  hasHeaderMargin: true
}

export default NotificationsProvider
