import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import { Container } from '../'
import styles from './styles'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children: ReactNode
}

export const SidebarLogo = forwardRef<HTMLDivElement, Props>(
  function SidebarLogo({ children, className, classes, style, ...rest }, ref) {
    return (
      <Container
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        flex
        bottom='small'
        left='medium'
        alignItems='center'
        className={className}
        style={style}
        classes={classes}
      >
        {children}
      </Container>
    )
  }
)

SidebarLogo.defaultProps = {}

SidebarLogo.displayName = 'SidebarLogo'

export default withStyles(styles)(SidebarLogo)
