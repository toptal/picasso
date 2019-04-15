import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Typography from '../Typography'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {}

const ModalTitle: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => (
  <div className={cx(classes.root, className)} style={style}>
    <Typography variant='h3' weight='light'>
      {children}
    </Typography>
  </div>
)

export default withStyles(styles)(ModalTitle)
