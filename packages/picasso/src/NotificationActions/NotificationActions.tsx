import React, { forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import Container from '../Container'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoNotificationActions'
})

export const NotificationActions = forwardRef<HTMLDivElement, Props>(
  function NotificationActions(props, ref) {
    const {
      children,
      classes: externalClasses,
      className,
      style,
      ...rest
    } = props

    const classes = mergeClasses(useStyles(props), externalClasses)

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
