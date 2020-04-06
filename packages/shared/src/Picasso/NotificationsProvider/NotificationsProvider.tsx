import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import { SnackbarProvider } from 'notistack'
import React, { FunctionComponent } from 'react'

import { useDrawer, usePageHeader } from '../Picasso'
import styles from './styles'

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
  const { hasDrawer } = useDrawer()

  const containerAnchorOriginTop = hasPageHeader
    ? classes.rootWithMargin
    : undefined

  return (
    <SnackbarProvider
      maxSnack={MAX_NOTIFICATION_MESSAGES}
      domRoot={container}
      classes={{
        containerAnchorOriginTopRight: cx({
          [classes.rootWithMargin]: hasPageHeader,
          [classes.rootWithDrawer]: hasDrawer
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
