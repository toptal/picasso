import { SnackbarProvider } from 'notistack'
import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'
import { usePageHeader } from '../Picasso'

const useStyles = makeStyles(styles)

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
  const classes = useStyles()

  const containerAnchorOriginTop = hasPageHeader
    ? classes.rootWithMargin
    : undefined

  return (
    <SnackbarProvider
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      domRoot={container}
      classes={{
        containerAnchorOriginTopRight: containerAnchorOriginTop,
        containerAnchorOriginTopLeft: containerAnchorOriginTop,
        containerAnchorOriginTopCenter: containerAnchorOriginTop
      }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
