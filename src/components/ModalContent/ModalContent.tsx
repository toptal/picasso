import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {}

const ModalContent: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => (
  <div className={cx(classes.root, className)} style={style}>
    {children}
  </div>
)

export default withStyles(styles)(ModalContent)
