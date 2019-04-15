import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import Typography from '../Typography'
import styles from './styles'

interface Props extends StandardProps {
  /** The text of the hint */
  children: ReactNode
}

export const FormHint: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => (
  <div className={cx(classes.root, className)} style={style}>
    <Typography className={classes.hint}>{children}</Typography>
  </div>
)

FormHint.defaultProps = {}

FormHint.displayName = 'FormHint'

export default withStyles(styles)(FormHint)
