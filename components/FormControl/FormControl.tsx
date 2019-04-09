import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIFormControl from '@material-ui/core/FormControl'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Content of FormControl */
  children?: ReactNode
}

const FormControl: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => (
  <MUIFormControl classes={classes} className={className} style={style}>
    {children}
  </MUIFormControl>
)

export default withStyles(styles)(FormControl)
