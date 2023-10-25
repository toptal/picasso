import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import { SPACING_2 } from '../utils'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNotificationActions',
})

export const NotificationActions = forwardRef<HTMLDivElement, Props>(
  function NotificationActions(props, ref) {
    const { children, className, style, ...rest } = props

    const classes = useStyles()

    return (
      <Container
        {...rest}
        classes={classes}
        className={className}
        style={style}
        top={SPACING_2}
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
