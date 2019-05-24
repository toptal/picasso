import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIFormControl from '@material-ui/core/FormControl'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Content of FormControl */
  children?: ReactNode
  /** Indicate whether `FormControl` is in error state */
  error?: boolean
  /** If true, the control will be disabled */
  disabled?: boolean
}

const FormControl: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  error,
  disabled,
  style
}) => (
  <MUIFormControl
    classes={classes}
    className={className}
    style={style}
    error={error}
    disabled={disabled}
  >
    {children}
  </MUIFormControl>
)

export default withStyles(styles)(FormControl)
