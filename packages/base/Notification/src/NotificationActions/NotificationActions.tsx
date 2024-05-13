import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {}

export const NotificationActions = forwardRef<HTMLDivElement, Props>(
  function NotificationActions(props, ref) {
    const { children, className, style, ...rest } = props

    return (
      <Container
        {...rest}
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
