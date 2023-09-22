import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import React from 'react'

import { usePageDrawer, usePageTopBar } from '../RootContext'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNotificationsProvider',
})

export interface NotificationsProviderProps {
  /** Notification DOMNode for createPortal */
  children: React.ReactNode
  /** Valid HTML Node element, used to target `ReactDOM.createPortal`.*/
  container?: HTMLElement
  /** Maximum notifications that can be stacked on top of one another.   */
  maxNotifications?: 1 | 2 | 3 | 4 | 5
}

const NotificationsProvider = ({
  children,
  container,
  maxNotifications = 5,
}: NotificationsProviderProps) => {
  const { hasTopBar } = usePageTopBar()
  const { hasDrawer } = usePageDrawer()
  const classes = useStyles()

  const containerAnchorOriginTop =
    hasTopBar && !hasDrawer ? classes.rootWithMargin : undefined

  return (
    <SnackbarProvider
      maxSnack={maxNotifications}
      domRoot={container}
      classes={{
        containerRoot: classes.root,
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
