import { SnackbarProvider } from 'notistack'
import React from 'react'

import { useDrawer, usePageTopBar } from '../RootContext'
import { containerRoot, containerTopWithMargin } from './styles'

export interface NotificationsProviderProps {
  /** Notification DOMNode for createPortal */
  children: React.ReactNode
  /** Valid HTML Node element, used to target `ReactDOM.createPortal`.*/
  container?: HTMLElement
  /** Maximum notifications that can be stacked on top of one another. */
  maxNotifications?: 1 | 2 | 3 | 4 | 5
}

const NotificationsProvider = ({
  children,
  container,
  maxNotifications = 5,
}: NotificationsProviderProps) => {
  const { hasTopBar } = usePageTopBar()
  const { hasDrawer } = useDrawer()

  const containerAnchorOriginTop =
    hasTopBar && !hasDrawer ? containerTopWithMargin : undefined

  return (
    <SnackbarProvider
      maxSnack={maxNotifications}
      domRoot={container}
      classes={{
        containerRoot,
        containerAnchorOriginTopRight: containerAnchorOriginTop,
        containerAnchorOriginTopLeft: containerAnchorOriginTop,
        containerAnchorOriginTopCenter: containerAnchorOriginTop,
      }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
