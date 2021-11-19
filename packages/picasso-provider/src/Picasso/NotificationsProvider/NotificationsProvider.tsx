import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { SnackbarProvider } from 'notistack'
import React from 'react'

import { useDrawer, usePageTopBar } from '../RootContext'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNotificationsProvider'
})

const MAX_NOTIFICATION_MESSAGES = 5

interface Props {
  /** Notification DOMNode for createPortal */
  container?: HTMLElement
}

const NotificationsProvider = ({ children, container }: Props) => {
  const { hasTopBar } = usePageTopBar()
  const classes = useStyles()
  const { hasDrawer } = useDrawer()

  const containerAnchorOriginTop = hasTopBar
    ? classes.rootWithMargin
    : undefined

  return (
    <SnackbarProvider
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      domRoot={container}
      classes={{
        containerAnchorOriginTopRight: cx(containerAnchorOriginTop, {
          [classes.marginWithDrawer]: hasDrawer
        }),
        containerAnchorOriginTopLeft: containerAnchorOriginTop,
        containerAnchorOriginTopCenter: containerAnchorOriginTop
      }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
