import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { SnackbarProvider } from 'notistack'
import React from 'react'

import { usePageTopBar } from '../RootContext'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNotificationsProvider',
})

const MAX_NOTIFICATION_MESSAGES = 5

interface Props {
  /** Notification DOMNode for createPortal */
  children: React.ReactNode
  container?: HTMLElement
}

const NotificationsProvider = ({ children, container }: Props) => {
  const { hasTopBar } = usePageTopBar()
  const classes = useStyles()

  const containerAnchorOriginTop = hasTopBar
    ? classes.rootWithMargin
    : undefined

  return (
    <SnackbarProvider
      maxSnack={MAX_NOTIFICATION_MESSAGES}
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
