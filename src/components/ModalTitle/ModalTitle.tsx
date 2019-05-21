import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Typography from '../Typography'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Title content */
  children: ReactNode
}

export const ModalTitle: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => (
  <div className={cx(classes.root, className)} style={style}>
    <Typography variant='heading' size='medium' color='black'>
      {children}
    </Typography>
  </div>
)

ModalTitle.displayName = 'ModalTitle'

export default withStyles(styles)(ModalTitle)
