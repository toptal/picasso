import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../../Picasso'
import styles from './styles'
import Container from '../../Container'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children: ReactNode
}

export const SidebarLogo: FunctionComponent<Props> = ({
  children,
  className,
  classes,
  style,
  ...rest
}) => (
  <Container
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
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

SidebarLogo.defaultProps = {}

SidebarLogo.displayName = 'SidebarLogo'

export default withStyles(styles)(SidebarLogo)
