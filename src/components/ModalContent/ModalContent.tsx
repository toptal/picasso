import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'
export interface Props extends StandardProps {
  /** Content of Modal */
  children: ReactNode
}

export const ModalContent: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style,
  elementSelector
}) => (
  <div
    className={cx(classes.root, className)}
    style={style}
    data-qa={elementSelector}
  >
    {children}
  </div>
)

ModalContent.displayName = 'ModalContent'

export default withStyles(styles)(ModalContent)
