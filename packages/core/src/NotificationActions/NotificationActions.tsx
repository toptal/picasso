import React, { forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import Container from '../Container'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {}

export const NotificationActions = forwardRef<HTMLDivElement, Props>(
  function NotificationActions(
    { children, classes, className, style, ...rest },
    ref
  ) {
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

export default withStyles(styles)(NotificationActions)
