import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Container from '../Container'
import styles from './styles'

export interface Props extends StandardProps {
  /** Actions part of Helpbox */
  children: ReactNode
}

export const HelpboxActions: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children
}) => (
  <Container
    className={cx(classes.root, className)}
    style={style}
    flex
    alignItems='center'
  >
    {children}
  </Container>
)

HelpboxActions.defaultProps = {}

HelpboxActions.displayName = 'HelpboxActions'

export default withStyles(styles)(HelpboxActions)
