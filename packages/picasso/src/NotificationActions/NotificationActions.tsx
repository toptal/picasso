import React, { forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import Container from '../Container'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNotificationActions'
})

export const NotificationActions = forwardRef<HTMLDivElement, Props>(
  function NotificationActions(props, ref) {
    const { children, className, style, ...rest } = props

    const classes = useStyles()

    return (
      <Container
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        classes={classes}
        className={className}
        style={style}
        top='xsmall'
        flex
        ref={ref}
      >
        {children}
      </Container>
    )
  }
)

NotificationActions.defaultProps = {}

NotificationActions.displayName = 'NotificationActions'

export default NotificationActions
