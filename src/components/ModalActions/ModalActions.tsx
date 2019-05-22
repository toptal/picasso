import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Action content (e.g. Buttons) */
  children: ReactNode
}

export const ModalActions: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => (
  <div className={cx(classes.root, className)} style={style}>
    {children}
  </div>
)

ModalActions.displayName = 'ModalActions'

export default withStyles(styles)(ModalActions)
